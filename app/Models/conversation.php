<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class conversation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_1', 
        'user_2',
        'AD_id',
       
    ];

    public function ads()
    {
        return $this->belongsTo(Ad::class, 'AD_id');
    }

    public function user1()
    {
        return $this->belongsTo(User::class, 'user_1');
    }

    public function user2()
    {
        return $this->belongsTo(User::class, 'user_2');
    }


    
}
