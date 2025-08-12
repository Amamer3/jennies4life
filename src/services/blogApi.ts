import { API_BASE_URL } from '../data';

interface BlogPost {
  comments: number;
  authorAvatar: string;
  featured: boolean;
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  category: string;
  tags: string[];
  featuredImage?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
}

interface CreateBlogPostRequest {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  status: 'draft' | 'published';
}

interface UpdateBlogPostRequest {
  title?: string;
  content?: string;
  excerpt?: string;
  category?: string;
  tags?: string[];
  featuredImage?: string;
  status?: 'draft' | 'published' | 'archived';
}

class BlogAPI {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  async getAllPosts(): Promise<BlogPost[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/blog/posts`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }
  }

  async createPost(postData: CreateBlogPostRequest): Promise<BlogPost> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/blog/posts`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        throw new Error(`Failed to create blog post: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }
  }

  async getPostById(id: string): Promise<BlogPost> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/blog/posts/${id}`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch blog post: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching blog post:', error);
      throw error;
    }
  }

  async updatePost(id: string, postData: UpdateBlogPostRequest): Promise<BlogPost> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/blog/posts/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        throw new Error(`Failed to update blog post: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating blog post:', error);
      throw error;
    }
  }

  async deletePost(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/blog/posts/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to delete blog post: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting blog post:', error);
      throw error;
    }
  }

  async publishPost(id: string): Promise<BlogPost> {
    return this.updatePost(id, { status: 'published' });
  }

  async archivePost(id: string): Promise<BlogPost> {
    return this.updatePost(id, { status: 'archived' });
  }
}

export const blogApi = new BlogAPI();
export type { BlogPost, CreateBlogPostRequest, UpdateBlogPostRequest };