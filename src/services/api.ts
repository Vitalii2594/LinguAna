const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  // Auth endpoints
  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: string;
  }) {
    const response = await this.request<{
      user: any;
      token: string;
      message: string;
    }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    this.setToken(response.token);
    return response;
  }

  async login(credentials: { email: string; password: string }) {
    const response = await this.request<{
      user: any;
      token: string;
      message: string;
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    this.setToken(response.token);
    return response;
  }

  async getProfile() {
    return this.request<{ user: any }>('/auth/profile');
  }

  async updateProfile(profileData: {
    firstName?: string;
    lastName?: string;
    avatar?: string;
  }) {
    return this.request<{ user: any; message: string }>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  logout() {
    this.setToken(null);
  }

  // Course endpoints
  async getCourses(filters?: {
    language?: string;
    level?: string;
    popular?: boolean;
  }) {
    const params = new URLSearchParams();
    if (filters?.language) params.append('language', filters.language);
    if (filters?.level) params.append('level', filters.level);
    if (filters?.popular) params.append('popular', 'true');
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<{ courses: any[] }>(`/courses${query}`);
  }

  async getCourse(id: string) {
    return this.request<{ course: any }>(`/courses/${id}`);
  }

  async createCourse(courseData: any) {
    return this.request<{ course: any; message: string }>('/courses', {
      method: 'POST',
      body: JSON.stringify(courseData),
    });
  }

  async updateCourse(id: string, courseData: any) {
    return this.request<{ course: any; message: string }>(`/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(courseData),
    });
  }

  async deleteCourse(id: string) {
    return this.request<{ message: string }>(`/courses/${id}`, {
      method: 'DELETE',
    });
  }

  async enrollInCourse(courseId: string) {
    return this.request<{ enrollment: any; message: string }>(`/courses/${courseId}/enroll`, {
      method: 'POST',
    });
  }

  async getMyEnrollments() {
    return this.request<{ enrollments: any[] }>('/courses/my-enrollments');
  }

  // Lesson endpoints
  async getLessons(courseId: string) {
    return this.request<{ lessons: any[] }>(`/lessons/course/${courseId}`);
  }

  async getLesson(id: string) {
    return this.request<{ lesson: any }>(`/lessons/${id}`);
  }

  async createLesson(courseId: string, lessonData: any) {
    return this.request<{ lesson: any; message: string }>(`/lessons/course/${courseId}`, {
      method: 'POST',
      body: JSON.stringify(lessonData),
    });
  }

  async updateLesson(id: string, lessonData: any) {
    return this.request<{ lesson: any; message: string }>(`/lessons/${id}`, {
      method: 'PUT',
      body: JSON.stringify(lessonData),
    });
  }

  async deleteLesson(id: string) {
    return this.request<{ message: string }>(`/lessons/${id}`, {
      method: 'DELETE',
    });
  }

  async markLessonComplete(lessonId: string) {
    return this.request<{ completion: any; progress: number; message: string }>(`/lessons/${lessonId}/complete`, {
      method: 'POST',
    });
  }

  // Dictionary endpoints
  async getDictionaryEntries(filters?: {
    language?: string;
    search?: string;
  }) {
    const params = new URLSearchParams();
    if (filters?.language) params.append('language', filters.language);
    if (filters?.search) params.append('search', filters.search);
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<{ entries: any[] }>(`/dictionary${query}`);
  }

  async createDictionaryEntry(entryData: any) {
    return this.request<{ entry: any; message: string }>('/dictionary', {
      method: 'POST',
      body: JSON.stringify(entryData),
    });
  }

  async updateDictionaryEntry(id: string, entryData: any) {
    return this.request<{ entry: any; message: string }>(`/dictionary/${id}`, {
      method: 'PUT',
      body: JSON.stringify(entryData),
    });
  }

  async deleteDictionaryEntry(id: string) {
    return this.request<{ message: string }>(`/dictionary/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();