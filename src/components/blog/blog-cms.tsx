"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Newspaper,
  Calendar,
  Clock,
  ArrowRight,
  Tag,
  User,
  ChevronLeft,
  Search,
  Filter,
  TrendingUp,
  Eye,
  Heart,
  Share2,
  Bookmark,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  views: number;
  likes: number;
  featured: boolean;
}

const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Web3 Infrastructure: Beyond Basic Explorers",
    excerpt: "How next-generation blockchain explorers are evolving to provide real-time analytics, cross-chain insights, and predictive monitoring.",
    content: "Full article content here...",
    author: "Sarah Chen",
    authorAvatar: "SC",
    publishedAt: "2024-06-20",
    readTime: "8 min",
    category: "Technology",
    tags: ["Web3", "Infrastructure", "Analytics"],
    image: "/blog/web3-infra.jpg",
    views: 12400,
    likes: 342,
    featured: true,
  },
  {
    id: "2",
    title: "Smart Contract Security: Best Practices for 2024",
    excerpt: "A comprehensive guide to securing your smart contracts with the latest auditing techniques and vulnerability detection.",
    content: "Full article content here...",
    author: "Marcus Rivera",
    authorAvatar: "MR",
    publishedAt: "2024-06-18",
    readTime: "12 min",
    category: "Security",
    tags: ["Security", "Smart Contracts", "Audit"],
    image: "/blog/security.jpg",
    views: 8900,
    likes: 256,
    featured: true,
  },
  {
    id: "3",
    title: "Cross-Chain Interoperability: Challenges and Solutions",
    excerpt: "Exploring the technical challenges of cross-chain communication and the protocols solving them.",
    content: "Full article content here...",
    author: "Dr. Aisha Patel",
    authorAvatar: "AP",
    publishedAt: "2024-06-15",
    readTime: "10 min",
    category: "Research",
    tags: ["Cross-Chain", "Interoperability", "DeFi"],
    image: "/blog/cross-chain.jpg",
    views: 6700,
    likes: 189,
    featured: false,
  },
  {
    id: "4",
    title: "BlocksScan Partners with Major DeFi Protocol",
    excerpt: "We're excited to announce our strategic partnership with leading DeFi protocols to enhance blockchain visibility.",
    content: "Full article content here...",
    author: "Team BlocksScan",
    authorAvatar: "BS",
    publishedAt: "2024-06-12",
    readTime: "5 min",
    category: "News",
    tags: ["Partnership", "DeFi", "Announcement"],
    image: "/blog/partnership.jpg",
    views: 15200,
    likes: 478,
    featured: true,
  },
  {
    id: "5",
    title: "Real-Time Blockchain Monitoring: Architecture Deep Dive",
    excerpt: "Technical deep dive into how BlocksScan achieves sub-second block propagation monitoring across multiple networks.",
    content: "Full article content here...",
    author: "James Wilson",
    authorAvatar: "JW",
    publishedAt: "2024-06-10",
    readTime: "15 min",
    category: "Engineering",
    tags: ["Architecture", "Monitoring", "Performance"],
    image: "/blog/monitoring.jpg",
    views: 5400,
    likes: 167,
    featured: false,
  },
  {
    id: "6",
    title: "The Rise of Layer 2 Solutions: A Market Analysis",
    excerpt: "Analyzing the adoption trends, performance metrics, and future outlook for Layer 2 scaling solutions.",
    content: "Full article content here...",
    author: "Emma Thompson",
    authorAvatar: "ET",
    publishedAt: "2024-06-08",
    readTime: "9 min",
    category: "Analysis",
    tags: ["Layer 2", "Scaling", "Market"],
    image: "/blog/layer2.jpg",
    views: 7800,
    likes: 234,
    featured: false,
  },
];

const categories = ["All", "Technology", "Security", "Research", "News", "Engineering", "Analysis"];

export function BlogCMS() {
  const [posts] = useState<BlogPost[]>(mockPosts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("blocksscan-saved-posts") || "[]");
    setSavedPosts(saved);
  }, []);

  const toggleSave = (postId: string) => {
    const newSaved = savedPosts.includes(postId)
      ? savedPosts.filter((id) => id !== postId)
      : [...savedPosts, postId];
    setSavedPosts(newSaved);
    localStorage.setItem("blocksscan-saved-posts", JSON.stringify(newSaved));
  };

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = posts.filter((p) => p.featured);

  if (selectedPost) {
    return (
      <div className="min-h-screen p-6" style={{ backgroundColor: "var(--page-bg)" }}>
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-sm mb-6 transition-colors hover:opacity-80"
            style={{ color: "var(--primary)" }}
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Blog
          </button>

          <article>
            <div className="mb-6">
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4"
                style={{ backgroundColor: "var(--badge-bg)", color: "var(--primary)" }}
              >
                <Tag className="w-3 h-3 mr-1" />
                {selectedPost.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                {selectedPost.title}
              </h1>
              <div className="flex items-center gap-4 text-sm" style={{ color: "var(--text-muted)" }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-[var(--text-primary)] text-xs font-bold">
                    {selectedPost.authorAvatar}
                  </div>
                  <span>{selectedPost.author}</span>
                </div>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(selectedPost.publishedAt).toLocaleDateString()}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {selectedPost.readTime} read
                </span>
              </div>
            </div>

            <div className="w-full h-64 sm:h-96 rounded-xl mb-8 border" style={{ backgroundColor: "var(--glass-bg)", borderColor: "var(--glass-border)" }}>
              <div className="w-full h-full flex items-center justify-center">
                <Newspaper className="w-16 h-16" style={{ color: "var(--text-muted)" }} />
              </div>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm border" style={{ borderColor: "var(--glass-border)", color: "var(--text-secondary)" }}>
                <Heart className="w-4 h-4" />
                {selectedPost.likes}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm border" style={{ borderColor: "var(--glass-border)", color: "var(--text-secondary)" }}>
                <Eye className="w-4 h-4" />
                {selectedPost.views.toLocaleString()}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm border" style={{ borderColor: "var(--glass-border)", color: "var(--text-secondary)" }}>
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={() => toggleSave(selectedPost.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm border"
                style={{
                  borderColor: savedPosts.includes(selectedPost.id) ? "var(--primary)" : "var(--glass-border)",
                  color: savedPosts.includes(selectedPost.id) ? "var(--primary)" : "var(--text-secondary)",
                }}
              >
                <Bookmark className="w-4 h-4" />
                {savedPosts.includes(selectedPost.id) ? "Saved" : "Save"}
              </button>
            </div>

            <div className="prose max-w-none" style={{ color: "var(--text-secondary)" }}>
              <p className="text-lg leading-relaxed mb-6">{selectedPost.excerpt}</p>
              <p className="leading-relaxed">
                {selectedPost.content} This is a demo article. In production, this would contain the full
                article content with rich formatting, code blocks, images, and interactive elements.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-8">
              {selectedPost.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: "var(--badge-bg)", color: "var(--primary)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "var(--page-bg)" }}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
            Blog & <span className="text-gradient">News</span>
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Latest insights, updates, and research from the BlocksScan team
          </p>
        </div>

        {/* Featured Posts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {featuredPosts.slice(0, 2).map((post) => (
            <Card
              key={post.id}
              className="glass-card cursor-pointer hover:border-primary/30 transition-all overflow-hidden"
              style={{ backgroundColor: "var(--card-bg)" }}
              onClick={() => setSelectedPost(post)}
            >
              <div className="h-48 border-b" style={{ backgroundColor: "var(--glass-bg)", borderColor: "var(--glass-border)" }}>
                <div className="w-full h-full flex items-center justify-center">
                  <Newspaper className="w-12 h-12" style={{ color: "var(--text-muted)" }} />
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{ backgroundColor: "var(--badge-bg)", color: "var(--primary)" }}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {post.readTime} read
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                  {post.title}
                </h3>
                <p className="text-sm mb-4 line-clamp-2" style={{ color: "var(--text-secondary)" }}>
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-[var(--text-primary)] text-[10px] font-bold">
                      {post.authorAvatar}
                    </div>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {post.author}
                    </span>
                  </div>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              style={{
                backgroundColor: "var(--input-bg)",
                borderColor: "var(--input-border)",
                color: "var(--text-primary)",
              }}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all border ${
                  selectedCategory === cat ? "border-primary/50" : "hover:bg-[var(--glass-bg)]"
                }`}
                style={{
                  backgroundColor: selectedCategory === cat ? "var(--badge-bg)" : "var(--glass-bg)",
                  borderColor: selectedCategory === cat ? "var(--primary)" : "var(--glass-border)",
                  color: selectedCategory === cat ? "var(--primary)" : "var(--text-secondary)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="glass-card cursor-pointer hover:border-primary/30 transition-all"
              style={{ backgroundColor: "var(--card-bg)" }}
              onClick={() => setSelectedPost(post)}
            >
              <div className="h-40 border-b" style={{ backgroundColor: "var(--glass-bg)", borderColor: "var(--glass-border)" }}>
                <div className="w-full h-full flex items-center justify-center">
                  <Newspaper className="w-10 h-10" style={{ color: "var(--text-muted)" }} />
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{ backgroundColor: "var(--badge-bg)", color: "var(--primary)" }}
                  >
                    {post.category}
                  </span>
                </div>
                <h3 className="font-semibold text-sm mb-2 line-clamp-2" style={{ color: "var(--text-primary)" }}>
                  {post.title}
                </h3>
                <p className="text-xs mb-3 line-clamp-2" style={{ color: "var(--text-muted)" }}>
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs" style={{ color: "var(--text-muted)" }}>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {(post.views / 1000).toFixed(1)}K
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {post.likes}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <Newspaper className="w-12 h-12 mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
            <p style={{ color: "var(--text-muted)" }}>No articles found</p>
          </div>
        )}
      </div>
    </div>
  );
}
