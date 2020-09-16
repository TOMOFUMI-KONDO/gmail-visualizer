<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Mail;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class MailsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getMails()
    {
        return Mail::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function addMails(Request $request)
    {
        $mails = Mail::firstOrNew(['emailId' => $request->emailId]);
        $mails->subject = $request->subject;
        $mails->body = $request->body;
        $mails->from = $request->from;
        $mails->to = $request->to;
        $mails->date = $request->date;
        $mails->day = $request->day;
        $mails->month = $request->month;
        $mails->year = $request->year;
        $mails->dayoftheweek = $request->dayoftheweek;
        $mails->updated_at = Carbon::now();
        $mails->created_at = Carbon::now();
        $mails->save();
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
