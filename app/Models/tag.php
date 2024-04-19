<?php

namespace App\Models;

use App\Models\ad;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class tag extends Model
{
    use HasFactory;



    public function ads()
    {
        return $this->belongsToMany(Ad::class, 'ad_tags', 'TagID', 'AdID');
    }
}
