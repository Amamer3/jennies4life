// Test file to demonstrate the updated Blog API endpoints
// This matches the user's specifications:
// POST /api/posts - Create a new blog post (admin only)
// PUT /api/posts/{id} - Update an existing blog post (admin only) 
// DELETE /api/posts/{id} - Delete a blog post (admin only)

import { blogApi } from '../services/blogApi';

// Example payload matching user's specification
const exampleCreatePayload = {
  "title": "How to Choose the Best Products",
  "content": "<p>Here's a comprehensive guide...</p>",
  "coverImage": "https://example.com/cover.jpg",
  "tags": [
    "guide",
    "products", 
    "tips"
  ],
  "status": "published"
};

// Example update payload
const exampleUpdatePayload = {
  "title": "How to Choose the Best Products - Updated",
  "content": "<p>Here's an updated comprehensive guide...</p>",
  "coverImage": "https://example.com/new-cover.jpg",
  "tags": [
    "guide",
    "products",
    "tips",
    "updated"
  ],
  "status": "published"
};

// Test functions
export const testBlogAPI = async () => {
  try {
    console.log('Testing Blog API endpoints...');
    
    // Test POST /api/posts
    console.log('1. Testing CREATE post...');
    const createdPost = await blogApi.createPost(exampleCreatePayload);
    console.log('✅ Post created:', createdPost);
    
    // Test PUT /api/posts/{id}
    console.log('2. Testing UPDATE post...');
    const updatedPost = await blogApi.updatePost(createdPost.id, exampleUpdatePayload);
    console.log('✅ Post updated:', updatedPost);
    
    // Test DELETE /api/posts/{id}
    console.log('3. Testing DELETE post...');
    await blogApi.deletePost(createdPost.id);
    console.log('✅ Post deleted successfully');
    
    console.log('🎉 All API tests passed!');
    
  } catch (error) {
    console.error('❌ API test failed:', error);
  }
};

// Usage example:
// testBlogAPI();