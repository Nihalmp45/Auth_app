import { sendEmail } from "@/helpers/mailer";
import { connect } from "../../dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function POST(request: NextRequest) {
    try {


  
    } catch (error:any) {
        return new Response(error.message, { status: 500 });
    }
}