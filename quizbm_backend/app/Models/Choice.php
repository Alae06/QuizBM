<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Choice extends Model
{
    use HasFactory;

    protected $fillable = [
        'question_id',
        'text',
        'is_correct'
    ];

    protected $hidden = [
        'is_correct'
    ];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
