import { db } from '../db'

import { tags } from '@/db/schema/programs'

export default function initiateDefaultData() {
  const tagInit = db.insert(tags).values([
    { id: 1000, name: 'Vegetarian' },
    { id: 1001, name: 'Vegan' },
    { id: 1002, name: 'Pescetarian' },
    { id: 1003, name: 'Gluten Intolerant' },
    { id: 1004, name: 'Wheat Intolerant' },
    { id: 1005, name: 'Lactose Intolerant' },
    { id: 1006, name: 'Allergic to Milk' },
    { id: 1007, name: 'Allergic to Egg' },
    { id: 1008, name: 'Allergic to Shellfish' },
    { id: 1009, name: 'Allergic to Fish' },
    { id: 1010, name: 'Allergic to Nuts' }
  ])
  Promise.all([tagInit])
}
