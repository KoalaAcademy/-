from models import db, User, JobPosition, Course, LearningPath
import json

def seed_database():
    """Seed the database with initial data"""
    
    # Clear existing data
    db.drop_all()
    db.create_all()
    
    # Seed Job Positions
    jobs_data = [
        {
            'title': 'Python 後端工程師',
            'description': '負責後端API開發、資料庫設計與系統架構，使用Python相關技術棧開發高效能的後端服務',
            'company': 'Tech Company A',
            'location': '台北市',
            'required_skills': json.dumps(['Python', 'Django', 'Flask', 'PostgreSQL', 'Redis', 'Docker']),
            'preferred_skills': json.dumps(['AWS', 'Kubernetes', 'GraphQL', 'Celery']),
            'experience_level': '2-5年',
            'salary_range': 'NT$ 800,000 - 1,200,000',
            'job_type': 'full-time',
            'remote_allowed': True
        },
        {
            'title': 'Frontend 開發工程師',
            'description': '負責前端介面開發、使用者體驗優化，打造現代化的網頁應用程式',
            'company': 'Startup B',
            'location': '新竹市',
            'required_skills': json.dumps(['JavaScript', 'React', 'Vue.js', 'HTML', 'CSS', 'TypeScript']),
            'preferred_skills': json.dumps(['Next.js', 'Tailwind CSS', 'Webpack', 'Jest']),
            'experience_level': '1-3年',
            'salary_range': 'NT$ 600,000 - 900,000',
            'job_type': 'full-time',
            'remote_allowed': False
        },
        {
            'title': 'Full Stack 開發工程師',
            'description': '全端開發，包含前後端技術，能夠獨立完成完整的網頁應用程式開發',
            'company': 'Digital Agency C',
            'location': '台中市',
            'required_skills': json.dumps(['JavaScript', 'Python', 'React', 'Node.js', 'MongoDB', 'AWS']),
            'preferred_skills': json.dumps(['Docker', 'CI/CD', 'GraphQL', 'Redis']),
            'experience_level': '3-6年',
            'salary_range': 'NT$ 900,000 - 1,500,000',
            'job_type': 'full-time',
            'remote_allowed': True
        },
        {
            'title': '資料分析師',
            'description': '負責數據收集、分析和視覺化，提供業務洞察和決策支援',
            'company': 'Data Corp D',
            'location': '台北市',
            'required_skills': json.dumps(['Python', 'SQL', 'Pandas', 'NumPy', 'Matplotlib', 'Excel']),
            'preferred_skills': json.dumps(['Tableau', 'Power BI', 'R', 'Machine Learning']),
            'experience_level': '1-4年',
            'salary_range': 'NT$ 700,000 - 1,100,000',
            'job_type': 'full-time',
            'remote_allowed': True
        }
    ]
    
    for job_data in jobs_data:
        job = JobPosition(**job_data)
        db.session.add(job)
    
    # Seed Courses
    courses_data = [
        # YouTube Courses
        {
            'title': 'Python 基礎程式設計完整教學',
            'instructor': '彭彭',
            'platform': 'youtube',
            'category': 'Programming',
            'difficulty_level': 'beginner',
            'duration': '12hr 30m',
            'rating': 4.8,
            'students_count': 15420,
            'price': 'Free',
            'tags': json.dumps(['Python', 'Basic', 'Programming']),
            'course_url': 'https://youtube.com/example',
            'description': '從零開始學習Python程式設計，適合完全沒有程式基礎的初學者',
            'language': 'zh-TW'
        },
        {
            'title': 'Django 網頁框架入門到精通',
            'instructor': '技術達人',
            'platform': 'youtube',
            'category': 'Web Development',
            'difficulty_level': 'intermediate',
            'duration': '15hr 20m',
            'rating': 4.9,
            'students_count': 8930,
            'price': 'Free',
            'tags': json.dumps(['Django', 'Web Framework', 'Python']),
            'course_url': 'https://youtube.com/example2',
            'description': '深入學習Django框架，建立完整的網頁應用程式',
            'language': 'zh-TW'
        },
        {
            'title': 'Flask 輕量級網頁開發',
            'instructor': '程式教學頻道',
            'platform': 'youtube',
            'category': 'Web Development',
            'difficulty_level': 'intermediate',
            'duration': '8hr 45m',
            'rating': 4.7,
            'students_count': 12340,
            'price': 'Free',
            'tags': json.dumps(['Flask', 'Web Development', 'Python']),
            'course_url': 'https://youtube.com/example3',
            'description': '學習使用Flask建立輕量級的網頁應用程式',
            'language': 'zh-TW'
        },
        
        # Hahow Courses
        {
            'title': '資料庫設計 - 有效的使用系統資料',
            'instructor': '專業講師',
            'platform': 'hahow',
            'category': 'Database',
            'difficulty_level': 'intermediate',
            'duration': '10hr 0m',
            'rating': 4.8,
            'students_count': 1250,
            'price': 'NT$ 2,400',
            'original_price': 'NT$ 3,200',
            'tags': json.dumps(['MySQL', 'Database', 'SQL']),
            'course_url': 'https://hahow.in/example',
            'description': '學習資料庫設計原理，建立高效能的資料庫系統',
            'language': 'zh-TW'
        },
        {
            'title': 'JavaScript 現代前端開發',
            'instructor': '前端專家',
            'platform': 'hahow',
            'category': 'Frontend',
            'difficulty_level': 'intermediate',
            'duration': '20hr 15m',
            'rating': 4.6,
            'students_count': 12500,
            'price': 'NT$ 1,200',
            'tags': json.dumps(['JavaScript', 'Frontend', 'Modern']),
            'course_url': 'https://hahow.in/example2',
            'description': '掌握現代JavaScript開發技巧，建立互動式網頁應用',
            'language': 'zh-TW'
        },
        {
            'title': 'React 完整開發指南',
            'instructor': 'React專家',
            'platform': 'hahow',
            'category': 'Frontend',
            'difficulty_level': 'advanced',
            'duration': '25hr 30m',
            'rating': 4.9,
            'students_count': 8900,
            'price': 'NT$ 3,200',
            'tags': json.dumps(['React', 'Frontend', 'JavaScript']),
            'course_url': 'https://hahow.in/example3',
            'description': '深入學習React框架，建立現代化的前端應用程式',
            'language': 'zh-TW'
        },
        
        # Udemy Courses
        {
            'title': 'Complete Python Developer Bootcamp',
            'instructor': 'Dr. Angela Yu',
            'platform': 'udemy',
            'category': 'Programming',
            'difficulty_level': 'beginner',
            'duration': '100hr+',
            'rating': 4.7,
            'students_count': 89342,
            'price': 'NT$ 1,790',
            'original_price': 'NT$ 3,200',
            'tags': json.dumps(['Python', 'Web Development', 'Advanced']),
            'course_url': 'https://udemy.com/example',
            'description': 'Complete Python bootcamp covering web development, data science, and automation',
            'language': 'en'
        },
        {
            'title': 'The Complete JavaScript Course 2024',
            'instructor': 'Jonas Schmedtmann',
            'platform': 'udemy',
            'category': 'Programming',
            'difficulty_level': 'beginner',
            'duration': '69hr',
            'rating': 4.8,
            'students_count': 156789,
            'price': 'NT$ 1,590',
            'tags': json.dumps(['JavaScript', 'Frontend', 'Complete']),
            'course_url': 'https://udemy.com/example2',
            'description': 'Master JavaScript with the most complete course on the market',
            'language': 'en'
        },
        {
            'title': 'Machine Learning A-Z',
            'instructor': 'Kirill Eremenko',
            'platform': 'udemy',
            'category': 'Data Science',
            'difficulty_level': 'intermediate',
            'duration': '44hr',
            'rating': 4.6,
            'students_count': 123456,
            'price': 'NT$ 1,890',
            'tags': json.dumps(['Machine Learning', 'Data Science', 'Python']),
            'course_url': 'https://udemy.com/example3',
            'description': 'Learn to create Machine Learning Algorithms in Python and R',
            'language': 'en'
        }
    ]
    
    for course_data in courses_data:
        course = Course(**course_data)
        db.session.add(course)
    
    # Seed Learning Paths
    learning_paths_data = [
        {
            'title': 'Python 後端工程師學習路徑',
            'description': '從零開始成為Python後端工程師的完整學習路徑',
            'target_job': 'Python 後端工程師',
            'difficulty_level': 'beginner_to_advanced',
            'estimated_duration': '6-9個月',
            'courses': json.dumps([1, 2, 3, 4]),  # Course IDs
            'prerequisites': json.dumps(['基本電腦操作', '英文閱讀能力']),
            'learning_outcomes': json.dumps([
                '掌握Python基礎語法',
                '能夠使用Django/Flask開發網頁應用',
                '了解資料庫設計與操作',
                '具備API開發能力'
            ])
        },
        {
            'title': 'Frontend 開發工程師學習路徑',
            'description': '成為現代前端開發工程師的學習路徑',
            'target_job': 'Frontend 開發工程師',
            'difficulty_level': 'beginner_to_intermediate',
            'estimated_duration': '4-6個月',
            'courses': json.dumps([5, 6, 8]),
            'prerequisites': json.dumps(['基本電腦操作', 'HTML/CSS基礎']),
            'learning_outcomes': json.dumps([
                '掌握現代JavaScript',
                '能夠使用React開發應用',
                '了解前端工程化工具',
                '具備響應式設計能力'
            ])
        }
    ]
    
    for path_data in learning_paths_data:
        path = LearningPath(**path_data)
        db.session.add(path)
    
    db.session.commit()
    print("Database seeded successfully!")

if __name__ == '__main__':
    from app import app
    with app.app_context():
        seed_database()
