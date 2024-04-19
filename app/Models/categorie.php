<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class categorie extends Model
{
    use HasFactory;


     protected $fillable = [
        'Name',
        'icon',
      
    ];

    public function ads(){

        return $this->hasMany(ad::class, 'CategoryID');

    }

   
}
