<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;


    protected $fillable = [
        'from_id', // Add 'from_id' to the fillable array
        'to_id',
        'message',
        'opened',
    ];

    
}
