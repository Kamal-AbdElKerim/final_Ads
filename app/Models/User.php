<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;

use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'Status',
        'image',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function ads()
    {
        return $this->hasMany(Ad::class, 'UserID');
    }

    public function conversations1()
    {
        return $this->hasMany(Conversation::class, 'user_1');
    }

    public function conversations2()
    {
        return $this->hasMany(Conversation::class, 'user_2');
    }
    public function Chats()
    {
        return $this->hasMany(Chat::class, 'from_id');
    }
}
