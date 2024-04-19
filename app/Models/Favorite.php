<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class favorite extends Model
{
    use HasFactory;

    protected $fillable = [
        'UserID',
        'AdID',
    ];

    public function users(){
        return $this->belongsTo(User::class);
    }

    public function ads(){
        return $this->belongsTo(ad::class,'AdID');
    }
}
