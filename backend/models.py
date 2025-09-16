from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20))
    education = db.Column(db.Text)
    work_experience = db.Column(db.Text)
    bio = db.Column(db.Text)
    avatar_url = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    skills = db.relationship('UserSkill', backref='user', lazy=True, cascade='all, delete-orphan')
    conversations = db.relationship('AIConversation', backref='user', lazy=True, cascade='all, delete-orphan')
    learning_records = db.relationship('LearningRecord', backref='user', lazy=True, cascade='all, delete-orphan')
    job_analyses = db.relationship('JobAnalysis', backref='user', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'education': self.education,
            'work_experience': self.work_experience,
            'bio': self.bio,
            'avatar_url': self.avatar_url,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class UserSkill(db.Model):
    __tablename__ = 'user_skills'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    skill_name = db.Column(db.String(100), nullable=False)
    proficiency_level = db.Column(db.Integer, default=1)  # 1-5 scale
    verified = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'skill_name': self.skill_name,
            'proficiency_level': self.proficiency_level,
            'verified': self.verified,
            'created_at': self.created_at.isoformat()
        }

class AIConversation(db.Model):
    __tablename__ = 'ai_conversations'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    session_id = db.Column(db.String(100))  # Group related messages
    message_type = db.Column(db.String(10), nullable=False)  # 'user' or 'ai'
    content = db.Column(db.Text, nullable=False)
    metadata = db.Column(db.Text)  # JSON for additional data
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'message_type': self.message_type,
            'content': self.content,
            'metadata': json.loads(self.metadata) if self.metadata else None,
            'timestamp': self.timestamp.isoformat()
        }

class JobPosition(db.Model):
    __tablename__ = 'job_positions'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    company = db.Column(db.String(200))
    location = db.Column(db.String(100))
    required_skills = db.Column(db.Text)  # JSON string
    preferred_skills = db.Column(db.Text)  # JSON string
    experience_level = db.Column(db.String(50))
    salary_range = db.Column(db.String(100))
    job_type = db.Column(db.String(50))  # full-time, part-time, contract
    remote_allowed = db.Column(db.Boolean, default=False)
    active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'company': self.company,
            'location': self.location,
            'required_skills': json.loads(self.required_skills) if self.required_skills else [],
            'preferred_skills': json.loads(self.preferred_skills) if self.preferred_skills else [],
            'experience_level': self.experience_level,
            'salary_range': self.salary_range,
            'job_type': self.job_type,
            'remote_allowed': self.remote_allowed,
            'created_at': self.created_at.isoformat()
        }

class Course(db.Model):
    __tablename__ = 'courses'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    instructor = db.Column(db.String(100))
    platform = db.Column(db.String(50), nullable=False)  # youtube, hahow, udemy
    category = db.Column(db.String(100))
    difficulty_level = db.Column(db.String(50))  # beginner, intermediate, advanced
    duration = db.Column(db.String(50))
    rating = db.Column(db.Float, default=0.0)
    students_count = db.Column(db.Integer, default=0)
    price = db.Column(db.String(50))
    original_price = db.Column(db.String(50))
    thumbnail_url = db.Column(db.String(500))
    tags = db.Column(db.Text)  # JSON string
    course_url = db.Column(db.String(500))
    description = db.Column(db.Text)
    language = db.Column(db.String(50), default='zh-TW')
    active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'instructor': self.instructor,
            'platform': self.platform,
            'category': self.category,
            'difficulty_level': self.difficulty_level,
            'duration': self.duration,
            'rating': self.rating,
            'students_count': self.students_count,
            'price': self.price,
            'original_price': self.original_price,
            'thumbnail_url': self.thumbnail_url,
            'tags': json.loads(self.tags) if self.tags else [],
            'course_url': self.course_url,
            'description': self.description,
            'language': self.language,
            'created_at': self.created_at.isoformat()
        }

class LearningRecord(db.Model):
    __tablename__ = 'learning_records'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    progress = db.Column(db.Integer, default=0)  # 0-100
    total_hours = db.Column(db.Float, default=0.0)
    completed = db.Column(db.Boolean, default=False)
    rating = db.Column(db.Integer)  # 1-5 stars
    review = db.Column(db.Text)
    certificate_earned = db.Column(db.Boolean, default=False)
    certificate_url = db.Column(db.String(500))
    started_at = db.Column(db.DateTime, default=datetime.utcnow)
    completed_at = db.Column(db.DateTime)
    last_accessed = db.Column(db.DateTime, default=datetime.utcnow)
    
    course = db.relationship('Course', backref='learning_records')
    
    def to_dict(self):
        return {
            'id': self.id,
            'progress': self.progress,
            'total_hours': self.total_hours,
            'completed': self.completed,
            'rating': self.rating,
            'review': self.review,
            'certificate_earned': self.certificate_earned,
            'certificate_url': self.certificate_url,
            'started_at': self.started_at.isoformat(),
            'completed_at': self.completed_at.isoformat() if self.completed_at else None,
            'last_accessed': self.last_accessed.isoformat()
        }

class JobAnalysis(db.Model):
    __tablename__ = 'job_analyses'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey('job_positions.id'), nullable=False)
    compatibility_score = db.Column(db.Float)
    matching_skills = db.Column(db.Text)  # JSON
    missing_skills = db.Column(db.Text)  # JSON
    recommendations = db.Column(db.Text)  # JSON
    analysis_date = db.Column(db.DateTime, default=datetime.utcnow)
    
    job = db.relationship('JobPosition', backref='analyses')
    
    def to_dict(self):
        return {
            'id': self.id,
            'compatibility_score': self.compatibility_score,
            'matching_skills': json.loads(self.matching_skills) if self.matching_skills else [],
            'missing_skills': json.loads(self.missing_skills) if self.missing_skills else [],
            'recommendations': json.loads(self.recommendations) if self.recommendations else [],
            'analysis_date': self.analysis_date.isoformat()
        }

class LearningPath(db.Model):
    __tablename__ = 'learning_paths'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    target_job = db.Column(db.String(200))
    difficulty_level = db.Column(db.String(50))
    estimated_duration = db.Column(db.String(100))
    courses = db.Column(db.Text)  # JSON array of course IDs
    prerequisites = db.Column(db.Text)  # JSON array
    learning_outcomes = db.Column(db.Text)  # JSON array
    active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'target_job': self.target_job,
            'difficulty_level': self.difficulty_level,
            'estimated_duration': self.estimated_duration,
            'courses': json.loads(self.courses) if self.courses else [],
            'prerequisites': json.loads(self.prerequisites) if self.prerequisites else [],
            'learning_outcomes': json.loads(self.learning_outcomes) if self.learning_outcomes else [],
            'created_at': self.created_at.isoformat()
        }
