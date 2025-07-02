<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Statistics;

class Quiz extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'max_attempts', 'time_per_question', 'pin', 'slug', 'user_id'];
    
    protected $hidden = ['pin']; // Ne pas exposer le PIN
    
    public function user() { return $this->belongsTo(User::class); }
    public function questions() { return $this->hasMany(Question::class); }
    public function quizAttempts() { return $this->hasMany(QuizAttempt::class); }
    public function statistics() { return $this->hasOne(Statistics::class); }
    
    // Mutateur pour hasher le PIN
    public function setPinAttribute($value)
    {
        $this->attributes['pin'] = $value ? bcrypt($value) : null;
    }
}
