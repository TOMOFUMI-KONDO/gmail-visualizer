<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class MailsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $param = [
            'from' => 'tomokon',
            'received_at' => Carbon::create(2020, 9, 1, 12, 00, 00),
            'body' => 'やっほ～'
        ];
        DB::table('mails')->insert($param);


        $param = [
            'from' => 'waka',
            'received_at' => Carbon::create(2020, 9, 2, 12, 00, 00),
            'body' => 'こんちは～'
        ];
        DB::table('mails')->insert($param);
    }
}
