import { db } from '../db/db';
import { eq } from 'drizzle-orm';
import { Members } from '@src/db';

type RoleType = "PRODUCER" | "FINANCE" | "EDITOR" | "CREATOR"



export const MembersModel = {
    findAllMember:async()=>{
        return await db.select().from(Members);
    },
    ChangeRoleMember:async(target_id:string,newRole:RoleType)=>{
        return await db.update(Members).set({ role: newRole }).where(eq(Members.id, target_id));
    },
    
    

} 