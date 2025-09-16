from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
import os
import json
import random
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from functools import wraps

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key-here')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///career_platform.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20))
    education = db.Column(db.Text)
    work_experience = db.Column(db.Text)
    bio = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    skills = db.relationship('UserSkill', backref='user', lazy=True, cascade='all, delete-orphan')
    conversations = db.relationship('AIConversation', backref='user', lazy=True, cascade='all, delete-orphan')
    learning_records = db.relationship('LearningRecord', backref='user', lazy=True, cascade='all, delete-orphan')

class UserSkill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    skill_name = db.Column(db.String(100), nullable=False)
    proficiency_level = db.Column(db.Integer, default=1)  # 1-5 scale
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class AIConversation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    message_type = db.Column(db.String(10), nullable=False)  # 'user' or 'ai'
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

class JobPosition(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    required_skills = db.Column(db.Text)  # JSON string
    experience_level = db.Column(db.String(50))
    salary_range = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    instructor = db.Column(db.String(100))
    platform = db.Column(db.String(50), nullable=False)  # youtube, hahow, udemy
    duration = db.Column(db.String(50))
    rating = db.Column(db.Float, default=0.0)
    students_count = db.Column(db.Integer, default=0)
    price = db.Column(db.String(50))
    thumbnail_url = db.Column(db.String(500))
    tags = db.Column(db.Text)  # JSON string
    course_url = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class LearningRecord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    progress = db.Column(db.Integer, default=0)  # 0-100
    total_hours = db.Column(db.Float, default=0.0)
    completed = db.Column(db.Boolean, default=False)
    started_at = db.Column(db.DateTime, default=datetime.utcnow)
    completed_at = db.Column(db.DateTime)
    last_accessed = db.Column(db.DateTime, default=datetime.utcnow)
    
    course = db.relationship('Course', backref='learning_records')

# Authentication decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        
        try:
            if token.startswith('Bearer '):
                token = token[7:]
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user_id = data['user_id']
        except:
            return jsonify({'message': 'Token is invalid'}), 401
        
        return f(current_user_id, *args, **kwargs)
    return decorated

# Initialize database
def initialize_database():
    """Initialize database tables and seed data - only runs once"""
    with app.app_context():
        # Create all tables
        db.create_all()
        
        # Seed data only if tables are empty
        seed_data()
        
        print("Database initialized successfully!")

def seed_data():
    """Seed initial data if tables are empty"""
    if JobPosition.query.count() == 0:
        # Add sample job positions
        jobs = [
            {
                'title': 'Python 後端工程師',
                'description': '負責後端API開發、資料庫設計與系統架構',
                'required_skills': json.dumps(['Python', 'Django', 'Flask', 'PostgreSQL', 'Redis', 'Docker']),
                'experience_level': '2-5年',
                'salary_range': 'NT$ 800,000 - 1,200,000'
            },
            {
                'title': 'Frontend 開發工程師',
                'description': '負責前端介面開發、使用者體驗優化',
                'required_skills': json.dumps(['JavaScript', 'React', 'Vue.js', 'HTML', 'CSS', 'TypeScript']),
                'experience_level': '1-3年',
                'salary_range': 'NT$ 600,000 - 900,000'
            },
            {
                'title': 'Full Stack 開發工程師',
                'description': '全端開發，包含前後端技術',
                'required_skills': json.dumps(['JavaScript', 'Python', 'React', 'Node.js', 'MongoDB', 'AWS']),
                'experience_level': '3-6年',
                'salary_range': 'NT$ 900,000 - 1,500,000'
            }
        ]
        
        for job_data in jobs:
            job = JobPosition(**job_data)
            db.session.add(job)
    
    if Course.query.count() == 0:
        # Add sample courses
        courses = [
            {
                'title': 'Python 基礎程式設計完整教學',
                'instructor': '彭彭',
                'platform': 'youtube',
                'duration': '12hr 30m',
                'rating': 4.8,
                'students_count': 15420,
                'price': 'Free',
                'tags': json.dumps(['Python', 'Basic', 'Programming']),
                'course_url': 'https://youtube.com/example'
            },
            {
                'title': '資料庫設計 - 有效的使用系統資料',
                'instructor': '專業講師',
                'platform': 'hahow',
                'duration': '10hr 0m',
                'rating': 4.8,
                'students_count': 1250,
                'price': 'NT$ 2,400',
                'tags': json.dumps(['MySQL', 'Database']),
                'course_url': 'https://hahow.in/example'
            },
            {
                'title': 'Complete Python Developer Bootcamp',
                'instructor': 'Dr. Angela Yu',
                'platform': 'udemy',
                'duration': '100hr+',
                'rating': 4.7,
                'students_count': 89342,
                'price': 'NT$ 1,790',
                'tags': json.dumps(['Python', 'Web Development', 'Advanced']),
                'course_url': 'https://udemy.com/example'
            }
        ]
        
        for course_data in courses:
            course = Course(**course_data)
            db.session.add(course)
    
    db.session.commit()
    print("Sample data seeded successfully!")

# API Routes

# User Management
@app.route('/api/user/register', methods=['POST'])
def register_user():
    data = request.get_json()
    
    # Check if user already exists
    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({'message': 'User already exists'}), 400
    
    user = User(
        name=data.get('name'),
        email=data.get('email'),
        phone=data.get('phone', ''),
        education=data.get('education', ''),
        work_experience=data.get('work_experience', ''),
        bio=data.get('bio', '')
    )
    
    db.session.add(user)
    db.session.commit()
    
    # Generate token
    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.utcnow() + timedelta(days=30)
    }, app.config['SECRET_KEY'])
    
    return jsonify({
        'message': 'User registered successfully',
        'token': token,
        'user': {
            'id': user.id,
            'name': user.name,
            'email': user.email
        }
    }), 201

@app.route('/api/user/profile', methods=['GET'])
@token_required
def get_user_profile(current_user_id):
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    
    skills = [{'name': skill.skill_name, 'level': skill.proficiency_level} 
              for skill in user.skills]
    
    # Calculate learning statistics
    total_hours = db.session.query(db.func.sum(LearningRecord.total_hours)).filter_by(user_id=current_user_id).scalar() or 0
    completed_courses = LearningRecord.query.filter_by(user_id=current_user_id, completed=True).count()
    certificates = completed_courses  # Assuming 1 certificate per completed course
    skills_growth = min(len(skills) * 10, 100)  # Simple calculation
    
    return jsonify({
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'phone': user.phone,
        'education': user.education,
        'work_experience': user.work_experience,
        'bio': user.bio,
        'skills': skills,
        'stats': {
            'total_hours': round(total_hours, 1),
            'completed_courses': completed_courses,
            'certificates': certificates,
            'skills_growth': skills_growth
        }
    })

@app.route('/api/user/profile', methods=['PUT'])
@token_required
def update_user_profile(current_user_id):
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    
    data = request.get_json()
    
    user.name = data.get('name', user.name)
    user.email = data.get('email', user.email)
    user.phone = data.get('phone', user.phone)
    user.education = data.get('education', user.education)
    user.work_experience = data.get('work_experience', user.work_experience)
    user.bio = data.get('bio', user.bio)
    user.updated_at = datetime.utcnow()
    
    db.session.commit()
    
    return jsonify({'message': 'Profile updated successfully'})

@app.route('/api/user/skills', methods=['POST'])
@token_required
def add_user_skill(current_user_id):
    data = request.get_json()
    skill_name = data.get('skill_name')
    proficiency_level = data.get('proficiency_level', 1)
    
    # Check if skill already exists
    existing_skill = UserSkill.query.filter_by(
        user_id=current_user_id, 
        skill_name=skill_name
    ).first()
    
    if existing_skill:
        existing_skill.proficiency_level = proficiency_level
    else:
        skill = UserSkill(
            user_id=current_user_id,
            skill_name=skill_name,
            proficiency_level=proficiency_level
        )
        db.session.add(skill)
    
    db.session.commit()
    return jsonify({'message': 'Skill added successfully'})

@app.route('/api/user/skills/<int:skill_id>', methods=['DELETE'])
@token_required
def remove_user_skill(current_user_id, skill_id):
    skill = UserSkill.query.filter_by(id=skill_id, user_id=current_user_id).first()
    if not skill:
        return jsonify({'message': 'Skill not found'}), 404
    
    db.session.delete(skill)
    db.session.commit()
    return jsonify({'message': 'Skill removed successfully'})

# AI Consultation
@app.route('/api/ai/chat', methods=['POST'])
@token_required
def ai_chat(current_user_id):
    data = request.get_json()
    message = data.get('message')
    
    # Save user message
    user_message = AIConversation(
        user_id=current_user_id,
        message_type='user',
        content=message
    )
    db.session.add(user_message)
    
    # Generate AI response (simplified)
    ai_responses = [
        "很好！請分享您具備的技能或專業能力，例如程式語言、工具使用經驗等。",
        "謝謝您的分享！請告訴我您的工作經驗或相關專案經歷。",
        "根據您提供的資料，我正在分析您的職能匹配度。讓我為您找出最適合的職缺和學習建議。",
        "分析完成！我建議您可以往 Python 後端工程師方向發展。您目前具備基礎條件，建議加強資料庫操作和框架應用能力。"
    ]
    
    # Get conversation count to determine response
    conversation_count = AIConversation.query.filter_by(user_id=current_user_id).count()
    response_index = min(conversation_count // 2, len(ai_responses) - 1)
    ai_response_text = ai_responses[response_index]
    
    ai_message = AIConversation(
        user_id=current_user_id,
        message_type='ai',
        content=ai_response_text
    )
    db.session.add(ai_message)
    db.session.commit()
    
    return jsonify({
        'response': ai_response_text,
        'timestamp': ai_message.timestamp.isoformat()
    })

@app.route('/api/ai/conversation', methods=['GET'])
@token_required
def get_conversation_history(current_user_id):
    conversations = AIConversation.query.filter_by(user_id=current_user_id)\
                                       .order_by(AIConversation.timestamp)\
                                       .all()
    
    messages = [{
        'id': conv.id,
        'type': conv.message_type,
        'content': conv.content,
        'timestamp': conv.timestamp.isoformat()
    } for conv in conversations]
    
    return jsonify({'messages': messages})

# Job Matching
@app.route('/api/jobs', methods=['GET'])
def get_jobs():
    jobs = JobPosition.query.all()
    return jsonify([{
        'id': job.id,
        'title': job.title,
        'description': job.description,
        'required_skills': json.loads(job.required_skills),
        'experience_level': job.experience_level,
        'salary_range': job.salary_range
    } for job in jobs])

@app.route('/api/jobs/<int:job_id>/analyze', methods=['POST'])
@token_required
def analyze_job_compatibility(current_user_id, job_id):
    user = User.query.get(current_user_id)
    job = JobPosition.query.get(job_id)
    
    if not user or not job:
        return jsonify({'message': 'User or job not found'}), 404
    
    user_skills = [skill.skill_name.lower() for skill in user.skills]
    required_skills = json.loads(job.required_skills)
    
    # Calculate compatibility
    matching_skills = []
    missing_skills = []
    
    for skill in required_skills:
        if skill.lower() in user_skills:
            matching_skills.append(skill)
        else:
            missing_skills.append(skill)
    
    compatibility_score = len(matching_skills) / len(required_skills) * 100 if required_skills else 0
    
    # Generate learning recommendations
    recommendations = []
    for skill in missing_skills[:3]:  # Top 3 missing skills
        courses = Course.query.filter(Course.tags.contains(skill)).limit(2).all()
        skill_courses = [{
            'id': course.id,
            'title': course.title,
            'platform': course.platform,
            'duration': course.duration
        } for course in courses]
        
        recommendations.append({
            'skill': skill,
            'courses': skill_courses
        })
    
    return jsonify({
        'compatibility_score': round(compatibility_score, 1),
        'matching_skills': matching_skills,
        'missing_skills': missing_skills,
        'recommendations': recommendations
    })

# Course Management
@app.route('/api/courses', methods=['GET'])
def get_courses():
    platform = request.args.get('platform')
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 6))
    
    query = Course.query
    if platform:
        query = query.filter_by(platform=platform)
    
    courses = query.paginate(page=page, per_page=per_page, error_out=False)
    
    return jsonify({
        'courses': [{
            'id': course.id,
            'title': course.title,
            'instructor': course.instructor,
            'platform': course.platform,
            'duration': course.duration,
            'rating': course.rating,
            'students_count': course.students_count,
            'price': course.price,
            'thumbnail_url': course.thumbnail_url,
            'tags': json.loads(course.tags) if course.tags else [],
            'course_url': course.course_url
        } for course in courses.items],
        'total': courses.total,
        'pages': courses.pages,
        'current_page': page
    })

@app.route('/api/courses/enroll', methods=['POST'])
@token_required
def enroll_course(current_user_id):
    data = request.get_json()
    course_id = data.get('course_id')
    
    # Check if already enrolled
    existing_record = LearningRecord.query.filter_by(
        user_id=current_user_id,
        course_id=course_id
    ).first()
    
    if existing_record:
        return jsonify({'message': 'Already enrolled in this course'}), 400
    
    learning_record = LearningRecord(
        user_id=current_user_id,
        course_id=course_id
    )
    
    db.session.add(learning_record)
    db.session.commit()
    
    return jsonify({'message': 'Enrolled successfully'})

@app.route('/api/courses/progress', methods=['PUT'])
@token_required
def update_course_progress(current_user_id):
    data = request.get_json()
    course_id = data.get('course_id')
    progress = data.get('progress', 0)
    hours_studied = data.get('hours_studied', 0)
    
    learning_record = LearningRecord.query.filter_by(
        user_id=current_user_id,
        course_id=course_id
    ).first()
    
    if not learning_record:
        return jsonify({'message': 'Learning record not found'}), 404
    
    learning_record.progress = progress
    learning_record.total_hours += hours_studied
    learning_record.last_accessed = datetime.utcnow()
    
    if progress >= 100 and not learning_record.completed:
        learning_record.completed = True
        learning_record.completed_at = datetime.utcnow()
    
    db.session.commit()
    
    return jsonify({'message': 'Progress updated successfully'})

@app.route('/api/user/learning-records', methods=['GET'])
@token_required
def get_learning_records(current_user_id):
    records = db.session.query(LearningRecord, Course)\
                       .join(Course)\
                       .filter(LearningRecord.user_id == current_user_id)\
                       .all()
    
    learning_data = [{
        'id': record.id,
        'progress': record.progress,
        'total_hours': record.total_hours,
        'completed': record.completed,
        'started_at': record.started_at.isoformat(),
        'last_accessed': record.last_accessed.isoformat(),
        'course': {
            'id': course.id,
            'title': course.title,
            'instructor': course.instructor,
            'platform': course.platform,
            'duration': course.duration
        }
    } for record, course in records]
    
    return jsonify({'learning_records': learning_data})

# Analytics and Recommendations
@app.route('/api/recommendations/courses', methods=['GET'])
@token_required
def get_course_recommendations(current_user_id):
    user = User.query.get(current_user_id)
    user_skills = [skill.skill_name for skill in user.skills]
    
    # Find courses that match user skills or fill skill gaps
    recommended_courses = []
    
    # Get courses for skills user already has (to advance)
    for skill in user_skills[:3]:  # Top 3 skills
        courses = Course.query.filter(Course.tags.contains(skill)).limit(2).all()
        recommended_courses.extend(courses)
    
    # Remove duplicates
    seen_ids = set()
    unique_courses = []
    for course in recommended_courses:
        if course.id not in seen_ids:
            unique_courses.append(course)
            seen_ids.add(course.id)
    
    return jsonify({
        'recommendations': [{
            'id': course.id,
            'title': course.title,
            'instructor': course.instructor,
            'platform': course.platform,
            'rating': course.rating,
            'reason': f'推薦給具備 {", ".join(json.loads(course.tags)[:2])} 技能的學習者'
        } for course in unique_courses[:6]]
    })

@app.route('/api/analytics/learning', methods=['GET'])
@token_required
def get_learning_analytics(current_user_id):
    # Get learning statistics
    total_hours = db.session.query(db.func.sum(LearningRecord.total_hours))\
                           .filter_by(user_id=current_user_id).scalar() or 0
    
    completed_courses = LearningRecord.query.filter_by(
        user_id=current_user_id, 
        completed=True
    ).count()
    
    in_progress_courses = LearningRecord.query.filter_by(user_id=current_user_id)\
                                             .filter(LearningRecord.progress > 0)\
                                             .filter(LearningRecord.progress < 100)\
                                             .count()
    
    # Get recent activity
    recent_activity = db.session.query(LearningRecord, Course)\
                               .join(Course)\
                               .filter(LearningRecord.user_id == current_user_id)\
                               .order_by(LearningRecord.last_accessed.desc())\
                               .limit(5)\
                               .all()
    
    activity_data = [{
        'course_title': course.title,
        'progress': record.progress,
        'last_accessed': record.last_accessed.isoformat(),
        'platform': course.platform
    } for record, course in recent_activity]
    
    return jsonify({
        'total_hours': round(total_hours, 1),
        'completed_courses': completed_courses,
        'in_progress_courses': in_progress_courses,
        'recent_activity': activity_data
    })

# Health check
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'timestamp': datetime.utcnow().isoformat()})

if __name__ == '__main__':
    initialize_database()
    
    # Run the Flask application
    app.run(debug=True, host='0.0.0.0', port=5000)
