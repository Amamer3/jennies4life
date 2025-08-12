import { API_BASE_URL } from '../data';

interface BlogPost {
  _id?: string;
  id?: string;
  slug?: string;
  title: string;
  content: string;
  excerpt?: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  category?: string;
  tags: string[];
  coverImage?: string;
  featuredImage?: string;
  image?: string; // For backward compatibility
  publishedAt?: string;
  publishDate?: string; // For backward compatibility
  createdAt: string;
  updatedAt: string;
  views?: number;
  likes?: number;
  comments?: number;
  authorAvatar?: string;
  featured?: boolean;
  readTime?: string; // For backward compatibility
}

interface CreateBlogPostRequest {
  title: string;
  content: string;
  coverImage?: string;
  tags: string[];
  status: 'draft' | 'published';
}

interface UpdateBlogPostRequest {
  title?: string;
  content?: string;
  coverImage?: string;
  tags?: string[];
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
    const response = await fetch(`${API_BASE_URL}/api/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
    }

    return await response.json();
  }

  async createPost(postData: CreateBlogPostRequest): Promise<BlogPost> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts`, {
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
      const response = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
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
      const response = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
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
      const response = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
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