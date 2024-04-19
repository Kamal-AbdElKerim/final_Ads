<?php

namespace App\Models;

use App\Models\tag;
use App\Models\favorite;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ad extends Model
{
    use HasFactory;

    protected $fillable = [
        'Title',
        'Description',
        'CategoryID',
        'Condition',
        'Puissance',
        'TypeCar',
        'Model',
        'UserID',
        'Price',
        'TypePrice',
        'City',
        'Location',
        'status',
    ];

    
        public function categories()
        {
            return $this->belongsTo(categorie::class,'CategoryID');
        }
        public function users()
        {
            return $this->belongsTo(user::class,'UserID');
        }

        public function images()
    {
        return $this->hasMany(image::class, 'AdID', 'id');
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'ad_tags', 'AdID', 'TagID');
    }

    public function favorites()
    {
        return $this->hasMany(favorite::class, 'AdID');
    }

    public function conversation()
    {
        return $this->hasMany(conversation::class,'AD_id');
    }

      




}
