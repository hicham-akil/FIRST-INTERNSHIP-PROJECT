<?php

return [

    'default' => env('BROADCAST_DRIVER', 'pusher'),

    'connections' => [

        'pusher' => [
            'driver' => 'pusher',
            'key' => env('d0fa2845657e4004ce00'),
            'secret' => env('4f3c1322cf29180f8a41'),
            'app_id' => env('1965079'),
         'options' => [
  'cluster' => 'mt1',
  'useTLS' => true
],
        ],

        'redis' => [
            'driver' => 'redis',
            'connection' => 'default',
        ],

        'log' => [
            'driver' => 'log',
        ],

        'null' => [
            'driver' => 'null',
        ],

    ],

];
