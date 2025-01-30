import { sha256 } from "@oslojs/crypto/sha2";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { eq } from "drizzle-orm";

import type { User, Session } from "@/db/schema/user";

import { db } from "@/db/index";
import { users, sessions } from "@/db/schema/user";

export function generateSessionToken(): string {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}

export async function createSession(token: string, userId: string): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: Session = {
		sessionToken: sessionId,
		userId,
		expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
	};
	await db.insert(sessions).values(session);
	return session;
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const result = await db
		.select({ user: users, session: sessions })
		.from(sessions)
		.innerJoin(users, eq(sessions.userId, users.id))
		.where(eq(sessions.sessionToken, sessionId));
	if (result.length < 1) {
		return { session: null, user: null };
	}
    const { user, session } = result[0]!
	if (Date.now() >= session.expires.getTime()) {
		await db.delete(sessions).where(eq(sessions.sessionToken, session.sessionToken));
		return { session: null, user: null };
	}
	if (Date.now() >= session.expires.getTime() - 1000 * 60 * 60 * 24 * 15) {
		session.expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
		await db
			.update(sessions)
			.set({
				expires: session.expires
			})
			.where(eq(sessions.sessionToken, session.sessionToken));
	}
	return { session, user };
}

export async function invalidateSession(sessionToken: string): Promise<void> {
	await db.delete(sessions).where(eq(sessions.sessionToken, sessionToken));
}

export type SessionValidationResult =
	| { session: Session; user: User }
	| { session: null; user: null };
