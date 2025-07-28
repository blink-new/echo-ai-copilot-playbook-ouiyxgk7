import React, { useState, useEffect } from 'react'
import { 
  BarChart3, 
  Phone, 
  Users, 
  TrendingUp, 
  Settings, 
  Search,
  Bell,
  ChevronDown,
  Play,
  Calendar,
  Target,
  Zap,
  Activity,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  Filter,
  Download,
  LogOut,
  User,
  CreditCard,
  Star,
  Crown,
  Sparkles,
  Copy,
  Plus,
  Upload,
  FileText,
  Mic,
  Save,
  Edit,
  Trash2,
  Eye,
  MessageSquare,
  TrendingDown,
  Award,
  BookOpen,
  Lightbulb,
  UserPlus,
  Mail,
  Briefcase
} from 'lucide-react'
import { blink } from './blink/client'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Badge } from './components/ui/badge'
import { Progress } from './components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar'
import { Textarea } from './components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'
import { Label } from './components/ui/label'

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState('individual')
  const [selectedBilling, setSelectedBilling] = useState('monthly')
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [showTutorial, setShowTutorial] = useState(false)
  const [tutorialStep, setTutorialStep] = useState(0)
  const [userProgress, setUserProgress] = useState({
    dealsCreated: 0,
    callsAnalyzed: 0,
    daysActive: 1
  })
  
  // New state for manual deal tracking
  const [deals, setDeals] = useState([
    {
      id: 1,
      company: 'Enterprise Corp',
      contact: 'John Smith',
      email: 'john@enterprise.com',
      value: '$125,000',
      stage: 'Negotiation',
      probability: 85,
      closeDate: 'Dec 15',
      risk: 'low',
      notes: 'Strong interest in our enterprise package. Budget approved.',
      calls: [
        {
          id: 1,
          date: '2024-01-15',
          duration: '45:30',
          transcript: 'Great call discussing their automation needs...',
          aiInsights: ['Budget confirmed at $100K-150K', 'Decision maker identified', 'Timeline: Q1 2024']
        }
      ]
    },
    {
      id: 2,
      company: 'StartupXYZ',
      contact: 'Sarah Johnson',
      email: 'sarah@startupxyz.com',
      value: '$45,000',
      stage: 'Proposal',
      probability: 65,
      closeDate: 'Jan 8',
      risk: 'medium',
      notes: 'Waiting for technical review from their team.',
      calls: []
    },
    {
      id: 3,
      company: 'MegaCorp Industries',
      contact: 'Mike Chen',
      email: 'mike@megacorp.com',
      value: '$280,000',
      stage: 'Discovery',
      probability: 40,
      closeDate: 'Feb 20',
      risk: 'high',
      notes: 'Large opportunity but competitive landscape.',
      calls: []
    }
  ])
  
  const [newDeal, setNewDeal] = useState({
    company: '',
    contact: '',
    email: '',
    phone: '',
    value: '',
    currency: 'USD',
    stage: 'Discovery',
    probability: 50,
    closeDate: '',
    source: 'Direct',
    industry: '',
    companySize: '',
    decisionMaker: '',
    budget: '',
    timeline: '',
    painPoints: '',
    competitorInfo: '',
    notes: '',
    priority: 'Medium'
  })
  
  const [newCall, setNewCall] = useState({
    dealId: null,
    transcript: '',
    duration: '',
    date: new Date().toISOString().split('T')[0]
  })
  
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'deal', message: 'Enterprise Corp deal moved to Negotiation', time: '2 hours ago', read: false },
    { id: 2, type: 'call', message: 'New call transcript analyzed for StartupXYZ', time: '4 hours ago', read: false },
    { id: 3, type: 'insight', message: 'AI detected buying signals in recent calls', time: '1 day ago', read: true },
    { id: 4, type: 'team', message: 'Sarah Garcia exceeded quota this month', time: '2 days ago', read: true }
  ])
  
  const [upcomingMeetings, setUpcomingMeetings] = useState([
    {
      id: 1,
      title: 'Discovery Call - TechCorp Inc',
      attendees: ['Sarah Chen', 'Mike Johnson'],
      time: '2024-01-25 10:00',
      duration: '30 min',
      type: 'zoom',
      status: 'confirmed',
      dealId: 1
    },
    {
      id: 2,
      title: 'Demo - FinanceFlow',
      attendees: ['Lisa Rodriguez', 'David Kim'],
      time: '2024-01-25 14:30',
      duration: '45 min',
      type: 'teams',
      status: 'confirmed',
      dealId: 2
    },
    {
      id: 3,
      title: 'Proposal Review - DataDrive',
      attendees: ['Emma Wilson'],
      time: '2024-01-26 09:00',
      duration: '60 min',
      type: 'google-meet',
      status: 'tentative',
      dealId: 3
    },
    {
      id: 4,
      title: 'Follow-up Call - StartupXYZ',
      attendees: ['Alex Thompson'],
      time: '2024-01-26 16:00',
      duration: '30 min',
      type: 'calendly',
      status: 'confirmed',
      dealId: 2
    }
  ])

  // Project management state
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Q1 Enterprise Sales Push',
      description: 'Focus on closing enterprise deals over $100K',
      status: 'active',
      progress: 65,
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      deals: [1, 3],
      team: [1, 2],
      goals: {
        revenue: '$500K',
        deals: 5,
        calls: 50
      },
      actual: {
        revenue: '$325K',
        deals: 3,
        calls: 32
      }
    },
    {
      id: 2,
      name: 'Mid-Market Expansion',
      description: 'Target mid-market companies in fintech and healthcare',
      status: 'active',
      progress: 40,
      startDate: '2024-01-15',
      endDate: '2024-04-15',
      deals: [2],
      team: [3, 4],
      goals: {
        revenue: '$300K',
        deals: 8,
        calls: 60
      },
      actual: {
        revenue: '$120K',
        deals: 3,
        calls: 24
      }
    }
  ])

  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    revenueGoal: '',
    dealsGoal: '',
    callsGoal: ''
  })

  const [newMeeting, setNewMeeting] = useState({
    title: '',
    attendees: '',
    time: '',
    duration: '30',
    type: 'zoom',
    dealId: null
  })

  // Integration management state
  const [integrations, setIntegrations] = useState({
    salesforce: { connected: false, status: 'disconnected', lastSync: null },
    hubspot: { connected: false, status: 'disconnected', lastSync: null },
    pipedrive: { connected: false, status: 'disconnected', lastSync: null },
    zoom: { connected: false, status: 'disconnected', lastSync: null },
    teams: { connected: false, status: 'disconnected', lastSync: null },
    slack: { connected: false, status: 'disconnected', lastSync: null },
    outreach: { connected: false, status: 'disconnected', lastSync: null },
    salesloft: { connected: false, status: 'disconnected', lastSync: null },
    zoominfo: { connected: false, status: 'disconnected', lastSync: null },
    apollo: { connected: false, status: 'disconnected', lastSync: null },
    linkedin: { connected: false, status: 'disconnected', lastSync: null },
    gmail: { connected: false, status: 'disconnected', lastSync: null },
    outlook: { connected: false, status: 'disconnected', lastSync: null },
    calendly: { connected: false, status: 'disconnected', lastSync: null },
    netsuite: { connected: false, status: 'disconnected', lastSync: null },
    sap: { connected: false, status: 'disconnected', lastSync: null },
    oracle: { connected: false, status: 'disconnected', lastSync: null },
    quickbooks: { connected: false, status: 'disconnected', lastSync: null }
  })

  // Settings state
  const [settings, setSettings] = useState({
    profile: {
      displayName: user?.displayName || '',
      email: user?.email || '',
      phone: '',
      timezone: 'UTC',
      language: 'en'
    },
    notifications: {
      email: true,
      aiInsights: true,
      dealAlerts: true,
      teamUpdates: false,
      weeklyReports: true
    },
    preferences: {
      theme: 'light',
      autoSave: true,
      showTutorial: true,
      defaultView: 'dashboard'
    }
  })

  const [teamMembers, setTeamMembers] = useState([
    { 
      id: 1, 
      name: 'Alex Thompson', 
      email: 'alex@company.com',
      role: 'Senior AE',
      calls: 24, 
      deals: 8, 
      revenue: '$340K', 
      score: 94,
      coachingNotes: 'Excellent at discovery calls, could improve closing techniques'
    },
    { 
      id: 2, 
      name: 'Maria Garcia', 
      email: 'maria@company.com',
      role: 'Account Executive',
      calls: 31, 
      deals: 12, 
      revenue: '$520K', 
      score: 89,
      coachingNotes: 'Strong closer, needs to work on objection handling'
    },
    { 
      id: 3, 
      name: 'David Kim', 
      email: 'david@company.com',
      role: 'Junior AE',
      calls: 18, 
      deals: 6, 
      revenue: '$180K', 
      score: 76,
      coachingNotes: 'Great potential, focus on qualifying prospects better'
    },
    { 
      id: 4, 
      name: 'Emma Wilson', 
      email: 'emma@company.com',
      role: 'Account Executive',
      calls: 27, 
      deals: 9, 
      revenue: '$290K', 
      score: 82,
      coachingNotes: 'Consistent performer, ready for enterprise accounts'
    }
  ])

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  // Data validation and recovery system
  useEffect(() => {
    try {
      // Validate critical data structures
      if (!Array.isArray(deals)) {
        console.warn('Deals data corrupted, resetting...')
        setDeals([])
      }
      if (!Array.isArray(projects)) {
        console.warn('Projects data corrupted, resetting...')
        setProjects([])
      }
      if (!Array.isArray(upcomingMeetings)) {
        console.warn('Meetings data corrupted, resetting...')
        setUpcomingMeetings([])
      }
      if (!Array.isArray(notifications)) {
        console.warn('Notifications data corrupted, resetting...')
        setNotifications([])
      }
      if (!Array.isArray(teamMembers)) {
        console.warn('Team members data corrupted, resetting...')
        setTeamMembers([])
      }
    } catch (error) {
      console.error('Data validation error:', error)
    }
  }, [deals, projects, upcomingMeetings, notifications, teamMembers])

  const handleLogin = () => {
    blink.auth.login()
  }

  const handleLogout = () => {
    blink.auth.logout()
  }

  // Helper functions for deal management
  const generateAIInsights = (transcript) => {
    // Simple AI insights simulation based on keywords
    const insights = []
    const lowerTranscript = transcript.toLowerCase()
    
    if (lowerTranscript.includes('budget') || lowerTranscript.includes('price') || lowerTranscript.includes('cost')) {
      insights.push('Budget discussion detected')
    }
    if (lowerTranscript.includes('decision') || lowerTranscript.includes('approve') || lowerTranscript.includes('sign')) {
      insights.push('Decision-making process mentioned')
    }
    if (lowerTranscript.includes('timeline') || lowerTranscript.includes('when') || lowerTranscript.includes('deadline')) {
      insights.push('Timeline requirements discussed')
    }
    if (lowerTranscript.includes('competitor') || lowerTranscript.includes('alternative') || lowerTranscript.includes('compare')) {
      insights.push('Competitive landscape mentioned')
    }
    if (lowerTranscript.includes('team') || lowerTranscript.includes('stakeholder') || lowerTranscript.includes('manager')) {
      insights.push('Multiple stakeholders involved')
    }
    
    return insights.length > 0 ? insights : ['Call transcript analyzed - no specific insights detected']
  }

  const tutorialSteps = [
    {
      title: "Welcome to Echo AI! 🎉",
      content: "Let's get you started with a quick tour of your sales intelligence platform.",
      target: "dashboard"
    },
    {
      title: "Create Your First Deal 💼",
      content: "Click on 'Deals' in the sidebar and create your first deal to start tracking your pipeline.",
      target: "deals"
    },
    {
      title: "Add Call Transcripts 📞",
      content: "Upload call transcripts to get AI-powered insights and coaching suggestions.",
      target: "conversations"
    },
    {
      title: "Check Your Calendar 📅",
      content: "View all your upcoming meetings from Zoom, Teams, Outlook, and Calendly in one place.",
      target: "calendar"
    },
    {
      title: "Get AI Coaching 🚀",
      content: "Visit the Coaching section to get personalized performance insights and training recommendations.",
      target: "coaching"
    }
  ]

  const addNewDeal = () => {
    if (!newDeal.company || !newDeal.contact) return
    
    // Calculate risk based on probability and other factors
    let risk = 'low'
    if (newDeal.probability < 30) risk = 'high'
    else if (newDeal.probability < 60) risk = 'medium'
    
    // Parse and format deal value
    let formattedValue = newDeal.value
    if (formattedValue && !formattedValue.startsWith('$')) {
      const numValue = parseFloat(formattedValue.replace(/[^0-9.]/g, ''))
      if (!isNaN(numValue)) {
        formattedValue = `$${numValue.toLocaleString()}`
      }
    }
    
    const deal = {
      id: Date.now(),
      ...newDeal,
      value: formattedValue,
      risk,
      calls: [],
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    }
    
    setDeals([...deals, deal])
    setUserProgress(prev => ({ ...prev, dealsCreated: prev.dealsCreated + 1 }))
    setNewDeal({
      company: '',
      contact: '',
      email: '',
      phone: '',
      value: '',
      currency: 'USD',
      stage: 'Discovery',
      probability: 50,
      closeDate: '',
      source: 'Direct',
      industry: '',
      companySize: '',
      decisionMaker: '',
      budget: '',
      timeline: '',
      painPoints: '',
      competitorInfo: '',
      notes: '',
      priority: 'Medium'
    })
  }

  const addCallToDeal = (dealId) => {
    if (!newCall.transcript) return
    
    const call = {
      id: Date.now(),
      ...newCall,
      aiInsights: generateAIInsights(newCall.transcript)
    }
    
    setDeals(deals.map(deal => 
      deal.id === dealId 
        ? { ...deal, calls: [...deal.calls, call] }
        : deal
    ))
    
    setUserProgress(prev => ({ ...prev, callsAnalyzed: prev.callsAnalyzed + 1 }))
    
    setNewCall({
      dealId: null,
      transcript: '',
      duration: '',
      date: new Date().toISOString().split('T')[0]
    })
  }

  const updateDeal = (dealId, updates) => {
    setDeals(deals.map(deal => 
      deal.id === dealId ? { ...deal, ...updates } : deal
    ))
  }

  const deleteDeal = (dealId) => {
    setDeals(deals.filter(deal => deal.id !== dealId))
  }

  const markNotificationAsRead = (notificationId) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ))
  }

  const addNewProject = () => {
    if (!newProject.name || !newProject.description) {
      alert('Please fill in project name and description')
      return
    }
    
    const project = {
      id: Date.now(),
      name: newProject.name,
      description: newProject.description,
      startDate: newProject.startDate,
      endDate: newProject.endDate,
      status: 'active',
      progress: 0,
      deals: [],
      team: [],
      goals: {
        revenue: newProject.revenueGoal || '$0',
        deals: parseInt(newProject.dealsGoal) || 0,
        calls: parseInt(newProject.callsGoal) || 0
      },
      actual: {
        revenue: '$0',
        deals: 0,
        calls: 0
      },
      createdAt: new Date().toISOString()
    }
    
    setProjects([...projects, project])
    setNewProject({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      revenueGoal: '',
      dealsGoal: '',
      callsGoal: ''
    })
    
    // Show success message
    alert('Project created successfully!')
  }

  const addNewMeeting = () => {
    if (!newMeeting.title || !newMeeting.time) {
      alert('Please fill in meeting title and time')
      return
    }
    
    try {
      const meeting = {
        id: Date.now(),
        title: newMeeting.title,
        attendees: newMeeting.attendees ? newMeeting.attendees.split(',').map(a => a.trim()).filter(a => a) : [],
        time: newMeeting.time,
        duration: newMeeting.duration + ' min',
        type: newMeeting.type,
        dealId: newMeeting.dealId ? parseInt(newMeeting.dealId) : null,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      }
      
      setUpcomingMeetings([...upcomingMeetings, meeting])
      setNewMeeting({
        title: '',
        attendees: '',
        time: '',
        duration: '30',
        type: 'zoom',
        dealId: null
      })
      
      alert('Meeting scheduled successfully!')
    } catch (error) {
      console.error('Error creating meeting:', error)
      alert('Failed to create meeting. Please try again.')
    }
  }

  const deleteProject = (projectId) => {
    try {
      if (window.confirm('Are you sure you want to delete this project?')) {
        setProjects(projects.filter(project => project.id !== projectId))
        alert('Project deleted successfully!')
      }
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Failed to delete project. Please try again.')
    }
  }

  const updateProjectProgress = (projectId, progress) => {
    try {
      setProjects(projects.map(project => 
        project.id === projectId ? { ...project, progress, lastUpdated: new Date().toISOString() } : project
      ))
    } catch (error) {
      console.error('Error updating project progress:', error)
      alert('Failed to update project progress.')
    }
  }

  // Integration management functions
  const connectIntegration = (integrationKey) => {
    try {
      setIntegrations(prev => ({
        ...prev,
        [integrationKey]: {
          connected: true,
          status: 'connected',
          lastSync: new Date().toISOString()
        }
      }))
      alert(`${integrationKey.charAt(0).toUpperCase() + integrationKey.slice(1)} connected successfully!`)
    } catch (error) {
      console.error('Error connecting integration:', error)
      alert('Failed to connect integration. Please try again.')
    }
  }

  const disconnectIntegration = (integrationKey) => {
    try {
      if (window.confirm(`Are you sure you want to disconnect ${integrationKey}?`)) {
        setIntegrations(prev => ({
          ...prev,
          [integrationKey]: {
            connected: false,
            status: 'disconnected',
            lastSync: null
          }
        }))
        alert(`${integrationKey.charAt(0).toUpperCase() + integrationKey.slice(1)} disconnected successfully!`)
      }
    } catch (error) {
      console.error('Error disconnecting integration:', error)
      alert('Failed to disconnect integration. Please try again.')
    }
  }

  // Settings management functions
  const updateProfileSettings = (updates) => {
    try {
      setSettings(prev => ({
        ...prev,
        profile: { ...prev.profile, ...updates }
      }))
    } catch (error) {
      console.error('Error updating profile settings:', error)
      alert('Failed to update profile settings.')
    }
  }

  const updateNotificationSettings = (key, value) => {
    try {
      setSettings(prev => ({
        ...prev,
        notifications: { ...prev.notifications, [key]: value }
      }))
    } catch (error) {
      console.error('Error updating notification settings:', error)
      alert('Failed to update notification settings.')
    }
  }

  const updatePreferences = (key, value) => {
    try {
      setSettings(prev => ({
        ...prev,
        preferences: { ...prev.preferences, [key]: value }
      }))
    } catch (error) {
      console.error('Error updating preferences:', error)
      alert('Failed to update preferences.')
    }
  }

  const pricingPlans = {
    individual: {
      name: 'Individual',
      description: 'Perfect for solo sales professionals',
      icon: User,
      color: 'blue',
      features: [
        'Call Intelligence & Recording',
        'AI-Powered Insights',
        'Deal Pipeline Management',
        'Performance Analytics',
        'Email Integration',
        'Mobile App Access'
      ],
      pricing: {
        biweekly: { amount: 12, priceId: 'price_1RpbngLi6PWU790o5V3IeQrw', savings: 0 },
        monthly: { amount: 19.99, priceId: 'price_1RpcA4Li6PWU790oAOBAAoQx', savings: 8 },
        annual: { amount: 199, priceId: 'price_1RpbnnLi6PWU790oecnqKpL6', savings: 41 }
      }
    },
    business: {
      name: 'Business',
      description: 'For teams and growing businesses',
      icon: Crown,
      color: 'purple',
      features: [
        'Everything in Individual',
        'Team Management & Coaching',
        'Advanced Analytics & Reports',
        'CRM Integrations (Salesforce, HubSpot)',
        'Custom AI Training',
        'Priority Support',
        'SFTP & API Access',
        'White-label Options'
      ],
      pricing: {
        biweekly: { amount: 29, priceId: 'price_1RpbnqLi6PWU790oasRDfIS7', savings: 0 },
        monthly: { amount: 49, priceId: 'price_1RpbnuLi6PWU790oUBFJzlJR', savings: 9 },
        annual: { amount: 499, priceId: 'price_1RpbnxLi6PWU790oWaKsDp79', savings: 89 }
      }
    }
  }

  const handleCheckout = async (priceId) => {
    setCheckoutLoading(true)
    try {
      const response = await blink.data.fetch({
        url: 'https://api.stripe.com/v1/checkout/sessions',
        method: 'POST',
        headers: {
          'Authorization': 'Bearer {{STRIPE_SECRET_KEY}}',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          'success_url': `${window.location.origin}?success=true`,
          'cancel_url': `${window.location.origin}?canceled=true`,
          'payment_method_types[0]': 'card',
          'mode': 'subscription',
          'line_items[0][price]': priceId,
          'line_items[0][quantity]': '1',
          'customer_email': user?.email || '',
          'allow_promotion_codes': 'true'
        }).toString()
      })
      
      if (response.body?.url) {
        window.open(response.body.url, '_blank')
      }
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setCheckoutLoading(false)
    }
  }

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Zap className="h-6 w-6 text-white animate-pulse" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Echo AI</h2>
          <p className="text-gray-600">Initializing your sales intelligence platform...</p>
        </div>
      </div>
    )
  }

  // Show login screen if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Echo AI</h1>
              <p className="text-gray-600">Your high-performance sales intelligence platform</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <span>Call Intelligence</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-blue-600" />
                  <span>Deal Insights</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                  <span>Performance Analytics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span>Team Coaching</span>
                </div>
              </div>

              <Button 
                onClick={handleLogin}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
                size="lg"
              >
                Sign In to Echo AI
              </Button>

              <div className="text-center text-sm text-gray-500">
                <p>Secure authentication powered by Blink</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'conversations', label: 'Conversations', icon: Phone },
    { id: 'deals', label: 'Deals', icon: Target },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'coaching', label: 'Coaching', icon: Zap },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'pricing', label: 'Pricing', icon: CreditCard },
    { id: 'about', label: 'About Us', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const recentCalls = [
    {
      id: 1,
      prospect: 'Sarah Chen',
      company: 'TechCorp Inc',
      duration: '32:15',
      sentiment: 'positive',
      score: 85,
      date: '2 hours ago',
      status: 'qualified'
    },
    {
      id: 2,
      prospect: 'Mike Johnson',
      company: 'FinanceFlow',
      duration: '18:42',
      sentiment: 'neutral',
      score: 62,
      date: '4 hours ago',
      status: 'follow-up'
    },
    {
      id: 3,
      prospect: 'Lisa Rodriguez',
      company: 'DataDrive Solutions',
      duration: '45:30',
      sentiment: 'positive',
      score: 92,
      date: '1 day ago',
      status: 'proposal'
    }
  ]

  const teamPerformance = teamMembers.map(member => ({
    name: member.name,
    calls: member.calls,
    deals: member.deals,
    revenue: member.revenue,
    score: member.score
  }))

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.2M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                +12.5%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calls This Week</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                +8.2%
              </span>
              from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600 flex items-center">
                <ArrowDown className="h-3 w-3 mr-1" />
                -2.1%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Deal Size</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$85K</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                +5.4%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Conversations */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Conversations</CardTitle>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCalls.map((call) => (
              <div key={call.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                    <Play className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{call.prospect}</div>
                    <div className="text-sm text-gray-500">{call.company}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-sm">
                    <div className="font-medium">{call.duration}</div>
                    <div className="text-gray-500">{call.date}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{call.score}</div>
                    <div className="text-xs text-gray-500">Score</div>
                  </div>
                  <Badge 
                    variant={call.sentiment === 'positive' ? 'default' : call.sentiment === 'neutral' ? 'secondary' : 'destructive'}
                  >
                    {call.sentiment}
                  </Badge>
                  <Badge variant="outline">
                    {call.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deals.map((deal) => (
                <div key={deal.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{deal.company}</div>
                    <div className="text-sm text-gray-500">{deal.stage} • {deal.closeDate}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{deal.value}</div>
                    <div className="flex items-center space-x-2">
                      <Progress value={deal.probability} className="w-16 h-2" />
                      <span className="text-xs">{deal.probability}%</span>
                      <div className={`w-2 h-2 rounded-full ${
                        deal.risk === 'low' ? 'bg-green-500' : 
                        deal.risk === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamPerformance.map((member, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{member.name}</div>
                      <div className="text-xs text-gray-500">{member.calls} calls • {member.deals} deals</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">{member.revenue}</div>
                    <div className="flex items-center space-x-2">
                      <Progress value={member.score} className="w-12 h-2" />
                      <span className="text-xs">{member.score}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderDeals = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Deal Pipeline</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New Deal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Deal - Manual Input</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company Name *</Label>
                    <Input
                      id="company"
                      value={newDeal.company}
                      onChange={(e) => setNewDeal({...newDeal, company: e.target.value})}
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact">Contact Person *</Label>
                    <Input
                      id="contact"
                      value={newDeal.contact}
                      onChange={(e) => setNewDeal({...newDeal, contact: e.target.value})}
                      placeholder="Enter contact name"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newDeal.email}
                      onChange={(e) => setNewDeal({...newDeal, email: e.target.value})}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={newDeal.phone}
                      onChange={(e) => setNewDeal({...newDeal, phone: e.target.value})}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
              </div>

              {/* Deal Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Deal Details</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="value">Deal Value</Label>
                    <Input
                      id="value"
                      value={newDeal.value}
                      onChange={(e) => setNewDeal({...newDeal, value: e.target.value})}
                      placeholder="e.g., 50000 or $50,000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={newDeal.currency} onValueChange={(value) => setNewDeal({...newDeal, currency: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="CAD">CAD (C$)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={newDeal.priority} onValueChange={(value) => setNewDeal({...newDeal, priority: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="stage">Stage</Label>
                    <Select value={newDeal.stage} onValueChange={(value) => setNewDeal({...newDeal, stage: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Lead">Lead</SelectItem>
                        <SelectItem value="Discovery">Discovery</SelectItem>
                        <SelectItem value="Qualification">Qualification</SelectItem>
                        <SelectItem value="Proposal">Proposal</SelectItem>
                        <SelectItem value="Negotiation">Negotiation</SelectItem>
                        <SelectItem value="Closed Won">Closed Won</SelectItem>
                        <SelectItem value="Closed Lost">Closed Lost</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="probability">Probability (%)</Label>
                    <Input
                      id="probability"
                      type="number"
                      min="0"
                      max="100"
                      value={newDeal.probability}
                      onChange={(e) => setNewDeal({...newDeal, probability: parseInt(e.target.value) || 0})}
                      placeholder="0-100"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="closeDate">Expected Close Date</Label>
                    <Input
                      id="closeDate"
                      type="date"
                      value={newDeal.closeDate}
                      onChange={(e) => setNewDeal({...newDeal, closeDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="source">Lead Source</Label>
                    <Select value={newDeal.source} onValueChange={(value) => setNewDeal({...newDeal, source: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Direct">Direct</SelectItem>
                        <SelectItem value="Website">Website</SelectItem>
                        <SelectItem value="Referral">Referral</SelectItem>
                        <SelectItem value="Cold Outreach">Cold Outreach</SelectItem>
                        <SelectItem value="Social Media">Social Media</SelectItem>
                        <SelectItem value="Trade Show">Trade Show</SelectItem>
                        <SelectItem value="Partner">Partner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Company Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Input
                      id="industry"
                      value={newDeal.industry}
                      onChange={(e) => setNewDeal({...newDeal, industry: e.target.value})}
                      placeholder="e.g., Technology, Healthcare, Finance"
                    />
                  </div>
                  <div>
                    <Label htmlFor="companySize">Company Size</Label>
                    <Select value={newDeal.companySize} onValueChange={(value) => setNewDeal({...newDeal, companySize: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-500">201-500 employees</SelectItem>
                        <SelectItem value="501-1000">501-1000 employees</SelectItem>
                        <SelectItem value="1000+">1000+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Sales Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Sales Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="decisionMaker">Decision Maker</Label>
                    <Input
                      id="decisionMaker"
                      value={newDeal.decisionMaker}
                      onChange={(e) => setNewDeal({...newDeal, decisionMaker: e.target.value})}
                      placeholder="Who makes the final decision?"
                    />
                  </div>
                  <div>
                    <Label htmlFor="budget">Budget Range</Label>
                    <Input
                      id="budget"
                      value={newDeal.budget}
                      onChange={(e) => setNewDeal({...newDeal, budget: e.target.value})}
                      placeholder="e.g., $10K-50K, Not disclosed"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="timeline">Timeline</Label>
                  <Input
                    id="timeline"
                    value={newDeal.timeline}
                    onChange={(e) => setNewDeal({...newDeal, timeline: e.target.value})}
                    placeholder="e.g., Q1 2024, ASAP, 6 months"
                  />
                </div>
              </div>

              {/* Additional Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Additional Details</h3>
                <div>
                  <Label htmlFor="painPoints">Pain Points</Label>
                  <Textarea
                    id="painPoints"
                    value={newDeal.painPoints}
                    onChange={(e) => setNewDeal({...newDeal, painPoints: e.target.value})}
                    placeholder="What problems are they trying to solve?"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="competitorInfo">Competitor Information</Label>
                  <Textarea
                    id="competitorInfo"
                    value={newDeal.competitorInfo}
                    onChange={(e) => setNewDeal({...newDeal, competitorInfo: e.target.value})}
                    placeholder="Who else are they considering? What's their current solution?"
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newDeal.notes}
                    onChange={(e) => setNewDeal({...newDeal, notes: e.target.value})}
                    placeholder="Any additional notes about this deal..."
                    rows={3}
                  />
                </div>
              </div>

              <Button onClick={addNewDeal} className="w-full bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 mr-2" />
                Create Deal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {deals.map((deal) => (
          <Card key={deal.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{deal.company}</h3>
                  <p className="text-gray-600">{deal.contact} • {deal.email}</p>
                  {deal.phone && <p className="text-sm text-gray-500">📞 {deal.phone}</p>}
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-bold text-xl">{deal.value}</div>
                    <div className="text-sm text-gray-500">{deal.stage}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={deal.probability} className="w-16 h-2" />
                    <span className="text-xs">{deal.probability}%</span>
                    <div className={`w-2 h-2 rounded-full ${
                      deal.risk === 'low' ? 'bg-green-500' : 
                      deal.risk === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                  </div>
                </div>
              </div>
              
              {/* Additional deal information */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                {deal.industry && (
                  <div>
                    <div className="text-xs text-gray-500">Industry</div>
                    <div className="text-sm font-medium">{deal.industry}</div>
                  </div>
                )}
                {deal.companySize && (
                  <div>
                    <div className="text-xs text-gray-500">Company Size</div>
                    <div className="text-sm font-medium">{deal.companySize}</div>
                  </div>
                )}
                {deal.source && (
                  <div>
                    <div className="text-xs text-gray-500">Source</div>
                    <div className="text-sm font-medium">{deal.source}</div>
                  </div>
                )}
                {deal.priority && (
                  <div>
                    <div className="text-xs text-gray-500">Priority</div>
                    <Badge variant={deal.priority === 'High' || deal.priority === 'Critical' ? 'destructive' : 'outline'}>
                      {deal.priority}
                    </Badge>
                  </div>
                )}
              </div>

              {deal.painPoints && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-1">Pain Points</h4>
                  <p className="text-sm text-blue-700">{deal.painPoints}</p>
                </div>
              )}

              {deal.notes && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-1">Notes</h4>
                  <p className="text-sm text-gray-700">{deal.notes}</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Badge variant="outline">Close: {deal.closeDate || 'TBD'}</Badge>
                  <Badge variant="outline">{deal.calls.length} calls</Badge>
                  {deal.budget && <Badge variant="outline">Budget: {deal.budget}</Badge>}
                </div>
                <div className="flex items-center space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Mic className="h-4 w-4 mr-2" />
                        Add Call
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Call Transcript</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="callDate">Call Date</Label>
                          <Input
                            id="callDate"
                            type="date"
                            value={newCall.date}
                            onChange={(e) => setNewCall({...newCall, date: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="duration">Duration</Label>
                          <Input
                            id="duration"
                            value={newCall.duration}
                            onChange={(e) => setNewCall({...newCall, duration: e.target.value})}
                            placeholder="e.g., 30:15"
                          />
                        </div>
                        <div>
                          <Label htmlFor="transcript">Call Transcript *</Label>
                          <Textarea
                            id="transcript"
                            value={newCall.transcript}
                            onChange={(e) => setNewCall({...newCall, transcript: e.target.value})}
                            placeholder="Paste your call transcript here..."
                            rows={8}
                          />
                        </div>
                        <Button 
                          onClick={() => {
                            setNewCall({...newCall, dealId: deal.id})
                            addCallToDeal(deal.id)
                          }} 
                          className="w-full"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save & Analyze
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="sm" onClick={() => deleteDeal(deal.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {deal.calls.length > 0 && (
                <div className="mt-4 border-t pt-4">
                  <h4 className="font-medium mb-2">Recent Calls</h4>
                  <div className="space-y-2">
                    {deal.calls.slice(-2).map((call) => (
                      <div key={call.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{call.date}</span>
                          <span className="text-sm text-gray-500">{call.duration}</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          {call.transcript.substring(0, 100)}...
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-blue-600">AI Insights:</div>
                          {call.aiInsights.map((insight, idx) => (
                            <div key={idx} className="text-xs text-gray-600">• {insight}</div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderConversations = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Conversation Intelligence</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload Recording
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {recentCalls.map((call) => (
          <Card key={call.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                    <Play className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{call.prospect}</h3>
                    <p className="text-gray-600">{call.company}</p>
                    <p className="text-sm text-gray-500">{call.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{call.score}</div>
                    <div className="text-xs text-gray-500">AI Score</div>
                  </div>
                  <Badge variant={call.sentiment === 'positive' ? 'default' : call.sentiment === 'neutral' ? 'secondary' : 'destructive'}>
                    {call.sentiment}
                  </Badge>
                  <Badge variant="outline">{call.status}</Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-xs text-gray-500">Duration</div>
                  <div className="text-sm font-medium">{call.duration}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Talk Time</div>
                  <div className="text-sm font-medium">65%</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Questions Asked</div>
                  <div className="text-sm font-medium">12</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-1">Key Insights</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Budget confirmed: $50K-100K range</li>
                    <li>• Decision timeline: Q1 2024</li>
                    <li>• Strong buying signals detected</li>
                  </ul>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-1">Next Steps</h4>
                  <p className="text-sm text-blue-700">Schedule technical demo with IT team. Send pricing proposal by Friday.</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    Play Recording
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    View Transcript
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderProjects = () => {
    try {
      if (!Array.isArray(projects)) {
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Projects data unavailable</h3>
              <p className="text-gray-600 mb-4">There was an issue loading your projects.</p>
              <Button onClick={() => setProjects([])} variant="outline">
                Reset Projects
              </Button>
            </div>
          </div>
        )
      }

      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Projects</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="projectName">Project Name *</Label>
                    <Input
                      id="projectName"
                      value={newProject.name}
                      onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                      placeholder="Enter project name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="projectDescription">Description *</Label>
                    <Textarea
                      id="projectDescription"
                      value={newProject.description}
                      onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                      placeholder="Describe your project goals..."
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={newProject.startDate}
                        onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={newProject.endDate}
                        onChange={(e) => setNewProject({...newProject, endDate: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="revenueGoal">Revenue Goal</Label>
                      <Input
                        id="revenueGoal"
                        value={newProject.revenueGoal}
                        onChange={(e) => setNewProject({...newProject, revenueGoal: e.target.value})}
                        placeholder="$500K"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dealsGoal">Deals Goal</Label>
                      <Input
                        id="dealsGoal"
                        type="number"
                        value={newProject.dealsGoal}
                        onChange={(e) => setNewProject({...newProject, dealsGoal: e.target.value})}
                        placeholder="10"
                      />
                    </div>
                    <div>
                      <Label htmlFor="callsGoal">Calls Goal</Label>
                      <Input
                        id="callsGoal"
                        type="number"
                        value={newProject.callsGoal}
                        onChange={(e) => setNewProject({...newProject, callsGoal: e.target.value})}
                        placeholder="100"
                      />
                    </div>
                  </div>
                  <Button onClick={addNewProject} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Create Project
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6">
            {projects.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects yet</h3>
                <p className="text-gray-600 mb-4">Create your first project to start tracking your sales goals.</p>
              </div>
            ) : (
              projects.map((project) => (
                <Card key={project.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{project.name}</h3>
                        <p className="text-gray-600">{project.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge variant="outline">{project.startDate} - {project.endDate}</Badge>
                          <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                            {project.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{project.progress}%</div>
                        <Progress value={project.progress} className="w-24 h-2 mt-1" />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-sm text-green-600">Revenue</div>
                        <div className="font-bold text-green-800">{project.actual.revenue}</div>
                        <div className="text-xs text-green-600">Goal: {project.goals.revenue}</div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-sm text-blue-600">Deals</div>
                        <div className="font-bold text-blue-800">{project.actual.deals}</div>
                        <div className="text-xs text-blue-600">Goal: {project.goals.deals}</div>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="text-sm text-purple-600">Calls</div>
                        <div className="font-bold text-purple-800">{project.actual.calls}</div>
                        <div className="text-xs text-purple-600">Goal: {project.goals.calls}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => deleteProject(project.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      )
    } catch (error) {
      console.error('Error rendering projects:', error)
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error loading projects</h3>
            <p className="text-gray-600 mb-4">There was an error loading the projects section.</p>
            <Button onClick={() => setActiveTab('dashboard')} variant="outline">
              Return to Dashboard
            </Button>
          </div>
        </div>
      )
    }
  }

  const renderCalendar = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Calendar & Meetings</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule New Meeting</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="meetingTitle">Meeting Title *</Label>
                <Input
                  id="meetingTitle"
                  value={newMeeting.title}
                  onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                  placeholder="e.g., Discovery Call - TechCorp"
                />
              </div>
              <div>
                <Label htmlFor="attendees">Attendees</Label>
                <Input
                  id="attendees"
                  value={newMeeting.attendees}
                  onChange={(e) => setNewMeeting({...newMeeting, attendees: e.target.value})}
                  placeholder="Enter names separated by commas"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="meetingTime">Date & Time *</Label>
                  <Input
                    id="meetingTime"
                    type="datetime-local"
                    value={newMeeting.time}
                    onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Select value={newMeeting.duration} onValueChange={(value) => setNewMeeting({...newMeeting, duration: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="meetingType">Platform</Label>
                  <Select value={newMeeting.type} onValueChange={(value) => setNewMeeting({...newMeeting, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zoom">Zoom</SelectItem>
                      <SelectItem value="teams">Microsoft Teams</SelectItem>
                      <SelectItem value="google-meet">Google Meet</SelectItem>
                      <SelectItem value="calendly">Calendly</SelectItem>
                      <SelectItem value="phone">Phone Call</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dealConnection">Connect to Deal</Label>
                  <Select value={newMeeting.dealId?.toString() || ''} onValueChange={(value) => setNewMeeting({...newMeeting, dealId: value ? parseInt(value) : null})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select deal" />
                    </SelectTrigger>
                    <SelectContent>
                      {deals.map((deal) => (
                        <SelectItem key={deal.id} value={deal.id.toString()}>
                          {deal.company}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={addNewMeeting} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {upcomingMeetings.map((meeting) => (
          <Card key={meeting.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{meeting.title}</h3>
                  <p className="text-gray-600">
                    {new Date(meeting.time).toLocaleDateString()} at {new Date(meeting.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="outline">{meeting.duration} min</Badge>
                    <Badge variant={meeting.status === 'confirmed' ? 'default' : 'secondary'}>
                      {meeting.status}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {meeting.type.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-2">Attendees</div>
                  <div className="space-y-1">
                    {meeting.attendees.map((attendee, idx) => (
                      <div key={idx} className="text-sm font-medium">{attendee}</div>
                    ))}
                  </div>
                </div>
              </div>

              {meeting.dealId && (
                <div className="p-3 bg-blue-50 rounded-lg mb-4">
                  <div className="text-sm text-blue-600">Connected Deal</div>
                  <div className="font-medium text-blue-800">
                    {deals.find(d => d.id === meeting.dealId)?.company || 'Unknown Deal'}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Join Meeting
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderTeam = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Team Management</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      <div className="grid gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-gray-600">{member.email}</p>
                    <Badge variant="outline">{member.role}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{member.score}</div>
                  <div className="text-sm text-gray-500">Performance Score</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-sm text-green-600">Revenue</div>
                  <div className="font-bold text-green-800">{member.revenue}</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-600">Deals</div>
                  <div className="font-bold text-blue-800">{member.deals}</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="text-sm text-purple-600">Calls</div>
                  <div className="font-bold text-purple-800">{member.calls}</div>
                </div>
              </div>

              <div className="p-3 bg-yellow-50 rounded-lg mb-4">
                <h4 className="font-medium text-yellow-800 mb-1">Coaching Notes</h4>
                <p className="text-sm text-yellow-700">{member.coachingNotes}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" size="sm">
                    <Award className="h-4 w-4 mr-2" />
                    View Performance
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderCoaching = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">AI Coaching & Training</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Lightbulb className="h-4 w-4 mr-2" />
            Get AI Insights
          </Button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                +5 points
              </span>
              from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Talk Time Ratio</CardTitle>
            <Mic className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-yellow-600 flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" />
                Target: 30-40%
              </span>
              Slightly high
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Questions Asked</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.2</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                +1.2
              </span>
              per call average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sentiment Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                +3%
              </span>
              positive sentiment
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2 text-blue-600" />
              AI Performance Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Top Strengths
                </h4>
                <ul className="text-sm text-green-700 space-y-2">
                  <li className="flex items-start">
                    <span className="font-medium mr-2">Discovery:</span>
                    <span>Excellent at uncovering pain points with open-ended questions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium mr-2">Rapport:</span>
                    <span>Strong connection building in first 3-5 minutes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium mr-2">Listening:</span>
                    <span>Good active listening with appropriate follow-up questions</span>
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Growth Opportunities
                </h4>
                <ul className="text-sm text-yellow-700 space-y-2">
                  <li className="flex items-start">
                    <span className="font-medium mr-2">Qualification:</span>
                    <span>Ask budget questions earlier in the conversation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium mr-2">Closing:</span>
                    <span>More confident trial closes throughout the call</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium mr-2">Next Steps:</span>
                    <span>Clearer commitment to specific next actions</span>
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                  <Target className="h-4 w-4 mr-2" />
                  This Week's Focus
                </h4>
                <p className="text-sm text-blue-700">
                  Practice the "Budget Bridge" technique: "To make sure I'm presenting the right solution, 
                  what budget range were you thinking for solving this challenge?"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-purple-600" />
              Personalized Training
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border-2 border-purple-200 rounded-lg bg-purple-50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-purple-800">Recommended: Budget Qualification</h4>
                  <Badge className="bg-purple-600">Priority</Badge>
                </div>
                <p className="text-sm text-purple-700 mb-3">
                  Master early budget qualification techniques to improve deal quality and close rates.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">25 min</Badge>
                    <Badge variant="outline">Interactive</Badge>
                  </div>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Start Now
                  </Button>
                </div>
              </div>

              <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <h4 className="font-medium mb-2">Advanced Closing Techniques</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Learn 7 proven closing methods and when to use each one for maximum effectiveness.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">35 min</Badge>
                    <Badge variant="outline">Video + Practice</Badge>
                  </div>
                  <Button size="sm" variant="outline">
                    Start Training
                  </Button>
                </div>
              </div>

              <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <h4 className="font-medium mb-2">Objection Handling Mastery</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Turn common objections into opportunities with the HEARD framework.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">30 min</Badge>
                    <Badge variant="outline">Role Play</Badge>
                  </div>
                  <Button size="sm" variant="outline">
                    Start Training
                  </Button>
                </div>
              </div>

              <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <h4 className="font-medium mb-2">Discovery Question Frameworks</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Advanced questioning techniques using SPIN, BANT, and MEDDIC methodologies.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">40 min</Badge>
                    <Badge variant="outline">Templates</Badge>
                  </div>
                  <Button size="sm" variant="outline">
                    Start Training
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2 text-green-600" />
            Recent Call Analysis & Coaching
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {recentCalls.slice(0, 3).map((call) => (
              <div key={call.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-lg">{call.prospect} - {call.company}</h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <p className="text-sm text-gray-500">{call.date} • {call.duration}</p>
                      <Badge variant={call.sentiment === 'positive' ? 'default' : call.sentiment === 'neutral' ? 'secondary' : 'destructive'}>
                        {call.sentiment}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{call.score}</div>
                    <div className="text-xs text-gray-500">AI Score</div>
                    <Progress value={call.score} className="w-16 h-2 mt-1" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h5 className="font-medium text-green-800 mb-2 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      What Worked Well
                    </h5>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Strong opening with relevant industry insight</li>
                      <li>• Asked 12 discovery questions</li>
                      <li>• Good active listening with paraphrasing</li>
                      <li>• Identified 3 key pain points</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <h5 className="font-medium text-orange-800 mb-2 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Areas to Improve
                    </h5>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• Budget not discussed until 28 minutes</li>
                      <li>• Missed opportunity for trial close</li>
                      <li>• Next steps were vague</li>
                      <li>• Talk time was 48% (target: 30-40%)</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h5 className="font-medium text-blue-800 mb-2 flex items-center">
                      <Lightbulb className="h-4 w-4 mr-1" />
                      Coaching Tips
                    </h5>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Use: "What's your budget for solving this?"</li>
                      <li>• Try: "How does that sound so far?"</li>
                      <li>• End with: "Shall we schedule 30 minutes next Tuesday?"</li>
                      <li>• Practice the 70/30 listening rule</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Listen to Call
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View Transcript
                    </Button>
                  </div>
                  <Button size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Practice Similar Scenario
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
            Weekly Progress & Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Calls This Week</h4>
              <div className="text-2xl font-bold text-blue-900">12 / 15</div>
              <Progress value={80} className="mt-2" />
              <p className="text-sm text-blue-700 mt-1">3 more calls to reach weekly goal</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Training Completed</h4>
              <div className="text-2xl font-bold text-green-900">2 / 3</div>
              <Progress value={67} className="mt-2" />
              <p className="text-sm text-green-700 mt-1">1 more module to complete</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
              <h4 className="font-medium text-purple-800 mb-2">Score Improvement</h4>
              <div className="text-2xl font-bold text-purple-900">+5 pts</div>
              <div className="flex items-center mt-2">
                <ArrowUp className="h-4 w-4 text-purple-600 mr-1" />
                <span className="text-sm text-purple-700">From last week</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Analytics & Reports</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                +3.2%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Sales Cycle</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42 days</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <ArrowDown className="h-3 w-3 mr-1" />
                -5 days
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.4M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                +18.7%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Quota</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                +12%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Chart visualization would appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Deal Stage Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Discovery</span>
                <div className="flex items-center space-x-2">
                  <Progress value={35} className="w-24 h-2" />
                  <span className="text-sm">35%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Qualification</span>
                <div className="flex items-center space-x-2">
                  <Progress value={25} className="w-24 h-2" />
                  <span className="text-sm">25%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Proposal</span>
                <div className="flex items-center space-x-2">
                  <Progress value={20} className="w-24 h-2" />
                  <span className="text-sm">20%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Negotiation</span>
                <div className="flex items-center space-x-2">
                  <Progress value={15} className="w-24 h-2" />
                  <span className="text-sm">15%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Closed Won</span>
                <div className="flex items-center space-x-2">
                  <Progress value={5} className="w-24 h-2" />
                  <span className="text-sm">5%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderPricing = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Supercharge Your Sales Game 🚀
          </span>
        </h2>
        <p className="text-gray-600 text-lg">Choose the perfect plan to accelerate your sales performance</p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-lg flex">
          <button
            onClick={() => setSelectedBilling('biweekly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedBilling === 'biweekly' ? 'bg-white shadow-sm' : 'text-gray-600'
            }`}
          >
            Bi-weekly
          </button>
          <button
            onClick={() => setSelectedBilling('monthly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedBilling === 'monthly' ? 'bg-white shadow-sm' : 'text-gray-600'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setSelectedBilling('annual')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedBilling === 'annual' ? 'bg-white shadow-sm' : 'text-gray-600'
            }`}
          >
            Annual
            <span className="ml-1 text-xs bg-green-100 text-green-600 px-1 rounded">Save 17%</span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {Object.entries(pricingPlans).map(([key, plan]) => {
          const Icon = plan.icon
          const pricing = plan.pricing[selectedBilling]
          const isPopular = key === 'business'
          
          return (
            <Card key={key} className={`relative hover:shadow-lg transition-all duration-300 ${
              isPopular ? 'ring-2 ring-purple-500 scale-105' : ''
            }`}>
              {isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-500 text-white px-3 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center ${
                  plan.color === 'blue' ? 'bg-blue-100' : 'bg-purple-100'
                }`}>
                  <Icon className={`h-6 w-6 ${
                    plan.color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                  }`} />
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <p className="text-gray-600">{plan.description}</p>
                
                <div className="mt-6">
                  <div className="text-4xl font-bold">
                    ${pricing.amount}
                    <span className="text-lg text-gray-500 font-normal">
                      /{selectedBilling === 'biweekly' ? '2 weeks' : selectedBilling === 'annual' ? 'year' : 'month'}
                    </span>
                  </div>
                  {pricing.savings > 0 && (
                    <p className="text-green-600 text-sm mt-1">
                      Save ${pricing.savings} per year!
                    </p>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={() => handleCheckout(pricing.priceId)}
                  disabled={checkoutLoading}
                  className={`w-full py-3 text-lg font-semibold ${
                    plan.color === 'blue' 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-purple-600 hover:bg-purple-700'
                  }`}
                >
                  {checkoutLoading ? 'Processing...' : 'Start Free Trial'}
                </Button>
                
                <div className="text-center text-sm text-gray-500">
                  <p>✅ 7-day free trial</p>
                  <p>💰 30-day money-back guarantee</p>
                  <p>🔒 Cancel anytime</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="text-center space-y-4">
        <div className="flex justify-center space-x-6 text-sm text-gray-500">
          <span>🔒 SOC 2 Compliant</span>
          <span>🛡️ GDPR Ready</span>
          <span>⚡ 99.9% Uptime</span>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <h3 className="font-semibold mb-4">Frequently Asked Questions</h3>
          <div className="space-y-3 text-left">
            <details className="p-3 border rounded-lg">
              <summary className="font-medium cursor-pointer">Can I change plans anytime?</summary>
              <p className="mt-2 text-sm text-gray-600">Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect at your next billing cycle.</p>
            </details>
            <details className="p-3 border rounded-lg">
              <summary className="font-medium cursor-pointer">What integrations are included?</summary>
              <p className="mt-2 text-sm text-gray-600">We support 50+ integrations including Salesforce, HubSpot, Zoom, Teams, Slack, and many more. Check our integrations page for the full list.</p>
            </details>
            <details className="p-3 border rounded-lg">
              <summary className="font-medium cursor-pointer">Is my data secure?</summary>
              <p className="mt-2 text-sm text-gray-600">Absolutely. We're SOC 2 compliant, GDPR ready, and use enterprise-grade encryption to protect your data.</p>
            </details>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAbout = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About Echo AI
          </span>
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Empowering sales teams with AI-driven insights, conversation intelligence, and performance optimization to achieve unprecedented results.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Conversation Intelligence</h3>
            <p className="text-gray-600 text-sm">
              AI-powered analysis of sales calls, emails, and meetings to extract actionable insights and improve performance.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Performance Analytics</h3>
            <p className="text-gray-600 text-sm">
              Comprehensive dashboards and reports that track key metrics, identify trends, and optimize sales processes.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Team Collaboration</h3>
            <p className="text-gray-600 text-sm">
              Seamless collaboration tools that enable knowledge sharing, coaching, and team performance optimization.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              At Echo AI, we believe that every sales professional deserves access to world-class intelligence and coaching. 
              Our mission is to democratize sales excellence through AI-powered insights that help teams close more deals, 
              build stronger relationships, and achieve their full potential.
            </p>
            <p className="text-gray-600">
              We're not just building software – we're creating a platform that transforms how sales teams operate, 
              learn, and succeed in an increasingly competitive marketplace.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Company Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">10,000+</div>
                <div className="text-sm text-blue-600">Active Users</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">$2.5B+</div>
                <div className="text-sm text-green-600">Revenue Tracked</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">50+</div>
                <div className="text-sm text-purple-600">Integrations</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">99.9%</div>
                <div className="text-sm text-yellow-600">Uptime</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact & Support</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Email Support</h4>
              <p className="text-gray-600 text-sm mb-2">Get help from our expert support team</p>
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                support@echo-ai.com
              </Button>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Live Chat</h4>
              <p className="text-gray-600 text-sm mb-2">Chat with us in real-time</p>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Start Chat
              </Button>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Documentation</h4>
              <p className="text-gray-600 text-sm mb-2">Comprehensive guides and tutorials</p>
              <Button variant="outline" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                View Docs
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security & Compliance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="font-semibold">SOC 2</div>
              <div className="text-sm text-gray-600">Type II Certified</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="font-semibold">GDPR</div>
              <div className="text-sm text-gray-600">Compliant</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="font-semibold">ISO 27001</div>
              <div className="text-sm text-gray-600">Certified</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="font-semibold">CCPA</div>
              <div className="text-sm text-gray-600">Compliant</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Settings</h2>
      
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  value={settings.profile.displayName}
                  onChange={(e) => updateProfileSettings({ displayName: e.target.value })}
                  placeholder="Enter your display name"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={settings.profile.phone}
                  onChange={(e) => updateProfileSettings({ phone: e.target.value })}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={settings.profile.timezone} onValueChange={(value) => updateProfileSettings({ timezone: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="EST">Eastern Time</SelectItem>
                    <SelectItem value="CST">Central Time</SelectItem>
                    <SelectItem value="MST">Mountain Time</SelectItem>
                    <SelectItem value="PST">Pacific Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="language">Language</Label>
                <Select value={settings.profile.language} onValueChange={(value) => updateProfileSettings({ language: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={() => alert('Profile settings saved!')}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Email Notifications</div>
                <div className="text-sm text-gray-500">Receive email updates about your deals and performance</div>
              </div>
              <Button
                variant={settings.notifications.email ? "default" : "outline"}
                size="sm"
                onClick={() => updateNotificationSettings('email', !settings.notifications.email)}
              >
                {settings.notifications.email ? 'On' : 'Off'}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">AI Insights</div>
                <div className="text-sm text-gray-500">Get AI-powered coaching and performance insights</div>
              </div>
              <Button
                variant={settings.notifications.aiInsights ? "default" : "outline"}
                size="sm"
                onClick={() => updateNotificationSettings('aiInsights', !settings.notifications.aiInsights)}
              >
                {settings.notifications.aiInsights ? 'On' : 'Off'}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Deal Alerts</div>
                <div className="text-sm text-gray-500">Notifications when deals change status or need attention</div>
              </div>
              <Button
                variant={settings.notifications.dealAlerts ? "default" : "outline"}
                size="sm"
                onClick={() => updateNotificationSettings('dealAlerts', !settings.notifications.dealAlerts)}
              >
                {settings.notifications.dealAlerts ? 'On' : 'Off'}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Team Updates</div>
                <div className="text-sm text-gray-500">Updates about team performance and achievements</div>
              </div>
              <Button
                variant={settings.notifications.teamUpdates ? "default" : "outline"}
                size="sm"
                onClick={() => updateNotificationSettings('teamUpdates', !settings.notifications.teamUpdates)}
              >
                {settings.notifications.teamUpdates ? 'On' : 'Off'}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Weekly Reports</div>
                <div className="text-sm text-gray-500">Weekly summary of your sales performance</div>
              </div>
              <Button
                variant={settings.notifications.weeklyReports ? "default" : "outline"}
                size="sm"
                onClick={() => updateNotificationSettings('weeklyReports', !settings.notifications.weeklyReports)}
              >
                {settings.notifications.weeklyReports ? 'On' : 'Off'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
            <p className="text-sm text-gray-600">Connect your favorite sales tools and platforms</p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600">SF</span>
                  </div>
                  <div>
                    <div className="font-medium">Salesforce</div>
                    <div className="text-sm text-gray-500">
                      {integrations.salesforce.connected ? `Connected • Last sync: ${new Date(integrations.salesforce.lastSync).toLocaleDateString()}` : 'Not connected'}
                    </div>
                  </div>
                </div>
                <Button
                  variant={integrations.salesforce.connected ? "outline" : "default"}
                  size="sm"
                  onClick={() => integrations.salesforce.connected ? disconnectIntegration('salesforce') : connectIntegration('salesforce')}
                >
                  {integrations.salesforce.connected ? 'Disconnect' : 'Connect'}
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-orange-600">HS</span>
                  </div>
                  <div>
                    <div className="font-medium">HubSpot</div>
                    <div className="text-sm text-gray-500">
                      {integrations.hubspot.connected ? `Connected • Last sync: ${new Date(integrations.hubspot.lastSync).toLocaleDateString()}` : 'Not connected'}
                    </div>
                  </div>
                </div>
                <Button
                  variant={integrations.hubspot.connected ? "outline" : "default"}
                  size="sm"
                  onClick={() => integrations.hubspot.connected ? disconnectIntegration('hubspot') : connectIntegration('hubspot')}
                >
                  {integrations.hubspot.connected ? 'Disconnect' : 'Connect'}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(integrations).slice(2).map(([key, integration]) => (
                  <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                      <div className="text-xs text-gray-500">
                        {integration.connected ? 'Connected' : 'Available'}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => integration.connected ? disconnectIntegration(key) : connectIntegration(key)}
                    >
                      {integration.connected ? 'Connected' : 'Connect'}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Notifications</h2>
        <Button variant="outline" size="sm" onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}>
          Mark All as Read
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className={`hover:shadow-md transition-shadow ${!notification.read ? 'border-blue-200 bg-blue-50' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${!notification.read ? 'bg-blue-500' : 'bg-gray-300'}`} />
                  <div>
                    <div className="font-medium">{notification.message}</div>
                    <div className="text-sm text-gray-500">{notification.time}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="capitalize">
                    {notification.type}
                  </Badge>
                  {!notification.read && (
                    <Button variant="ghost" size="sm" onClick={() => markNotificationAsRead(notification.id)}>
                      Mark as Read
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderContent = () => {
    try {
      switch (activeTab) {
        case 'dashboard':
          return renderDashboard()
        case 'conversations':
          return renderConversations()
        case 'deals':
          return renderDeals()
        case 'projects':
          return renderProjects()
        case 'calendar':
          return renderCalendar()
        case 'team':
          return renderTeam()
        case 'coaching':
          return renderCoaching()
        case 'analytics':
          return renderAnalytics()
        case 'pricing':
          return renderPricing()
        case 'about':
          return renderAbout()
        case 'settings':
          return renderSettings()
        case 'notifications':
          return renderNotifications()
        default:
          return renderDashboard()
      }
    } catch (error) {
      console.error('Error rendering content:', error)
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
            <p className="text-gray-600 mb-4">We encountered an error while loading this section.</p>
            <Button onClick={() => setActiveTab('dashboard')} variant="outline">
              Return to Dashboard
            </Button>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">Echo AI</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>
                {user?.displayName ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase() : 
                 user?.email ? user.email.substring(0, 2).toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="text-sm font-medium">
                {user?.displayName || user?.email?.split('@')[0] || 'User'}
              </div>
              <div className="text-xs text-gray-500">Sales Professional</div>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {sidebarItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
              </h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your sales.</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setActiveTab('analytics')}
              >
                <Calendar className="h-4 w-4 mr-2" />
                This Week
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setActiveTab('notifications')}
                className="relative"
              >
                <Bell className="h-4 w-4" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  </div>
                )}
              </Button>
              <Button onClick={() => setActiveTab('coaching')}>
                <Zap className="h-4 w-4 mr-2" />
                AI Insights
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default App