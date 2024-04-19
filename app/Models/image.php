<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class image extends Model
{
    use HasFactory;

    protected $fillable = [
        'ImageURL',
        'AdID',
       
    ];


    public function ad()
    {
        return $this->belongsTo(ad::class, 'AdID', 'id');
    }
}
