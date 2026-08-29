import { db } from '../db/db';
import { eq } from 'drizzle-orm';
import { RoleChangeRequests } from '@src/db';
import { MemberReqType } from '@src/controllers/member.controller';

export type RoleType = "PRODUCER" | "FINANCE" | "EDITOR" | "CREATOR"



export const RequestModel = {
    CreateRequestChangeRole:async(data:MemberReqType)=>{
        return await db.insert(RoleChangeRequests).values({
            id:data.id, 
            requester_id:data.requester_id,
            target_id:data.target_id,
            new_role:data.new_role,
            status:"PENDING"});
    },

    
    

} 