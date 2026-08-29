import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import "dotenv/config";
import { Members } from "./schema";
type NewMember = typeof Members.$inferInsert;
const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
const db = drizzle({ client });

// เพิ่มข้อมูลลง DB
async function seed() {

  const members:NewMember[] = [
   {
      "id": "M01",
      "name": "คุยกันได้",
      "role": "PRODUCER",
      "active": true
    },
    {
      "id": "M02",
      "name": "ใบเสร็จอยู่ไหน",
      "role": "FINANCE",
      "active": true
    },
    {
      "id": "M03",
      "name": "ตัดคลิปก่อน",
      "role": "EDITOR",
      "active": true
    },
    {
      "id": "M04",
      "name": "เพื่อนกันตลอดไป",
      "role": "CREATOR",
      "active": true
    },
    {
      "id": "M05",
      "name": "อ่านแชตย้อนหลัง",
      "role": "CREATOR",
      "active": true
    }
  ];
  for (const user of members) {
    await db.insert(Members).values(user);
  }
  console.log(`insert ${members.length}`);

}

seed();