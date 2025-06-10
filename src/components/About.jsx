import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Code, Users, Lightbulb, Trophy, Calendar, Heart } from 'lucide-react';
import sdcLogo from '../assets/sdc.png';

const About = () => {
  const features = [
    {
      icon: Code,
      title: 'Learn & Develop',
      description: 'Master programming languages, frameworks, and development tools through hands-on workshops and projects.',
      color: 'from-[var(--color-sdc-purple-mid)] to-[var(--color-sdc-purple-bright)]'
    },
    {
      icon: Users,
      title: 'Collaborate',
      description: 'Work with like-minded peers on exciting projects and build lasting professional relationships.',
      color: 'from-[var(--color-sdc-purple-bright)] to-[var(--color-sdc-blue-bright)]'
    },
    {
      icon: Lightbulb,
      title: 'Innovate',
      description: 'Turn your ideas into reality through hackathons, innovation challenges, and startup incubation.',
      color: 'from-[var(--color-sdc-blue-bright)] to-[var(--color-sdc-purple-mid)]'
    },
    {
      icon: Trophy,
      title: 'Compete',
      description: 'Participate in coding competitions, hackathons, and showcase your skills on regional and national levels.',
      color: 'from-[var(--color-sdc-purple-dark)] to-[var(--color-sdc-purple-mid)]'
    }
  ];

  const stats = [
    { number: '500+', label: 'Active Members' },
    { number: '50+', label: 'Projects Completed' },
    { number: '25+', label: 'Workshops Conducted' },
    { number: '10+', label: 'Hackathons Won' }
  ];

  const activities = [
    {
      title: 'Weekly Coding Workshops',
      description: 'Learn new technologies and programming concepts',
      icon: Code,
      frequency: 'Every Wednesday'
    },
    {
      title: 'Monthly Hackathons',
      description: 'Build innovative solutions in 24-48 hours',
      icon: Lightbulb,
      frequency: 'First weekend of every month'
    },
    {
      title: 'Project Showcases',
      description: 'Present your work to the community',
      icon: Trophy,
      frequency: 'End of each semester'
    },
    {
      title: 'Tech Talks',
      description: 'Industry experts share insights and trends',
      icon: Users,
      frequency: 'Bi-weekly'
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-sdc-dark)] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-sdc-purple-dark)]/10 via-transparent to-[var(--color-sdc-blue-bright)]/10"></div>
      <div className="absolute top-32 right-32 w-48 h-48 bg-[var(--color-sdc-purple-mid)]/5 rounded-full animate-float"></div>
      <div className="absolute bottom-32 left-32 w-36 h-36 bg-[var(--color-sdc-blue-bright)]/5 rounded-full animate-float" style={{animationDelay: '3s'}}></div>

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-gray-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <img src={sdcLogo} alt="SDC Logo" className="w-10 h-10" />
            <div>
              <h1 className="text-lg font-bold text-white">About SDC</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <img src={sdcLogo} alt="SDC Logo" className="w-24 h-24 animate-pulse-glow" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 sdc-text-gradient">
            Software Development Club
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Empowering the next generation of developers through collaboration, innovation, and continuous learning. 
            Join a community where code meets creativity and ideas become reality.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button className="btn-primary">
                Join Our Community
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="card-dark border-gray-800 text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold sdc-text-gradient mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12 text-white">
            Why Join <span className="sdc-text-gradient">SDC</span>?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-dark border-gray-800 group hover:border-[var(--color-sdc-purple-mid)]/50 transition-all duration-300">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:animate-pulse-glow`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-white group-hover:sdc-text-gradient transition-all duration-300">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Activities Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12 text-white">
            Our <span className="sdc-text-gradient">Activities</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activities.map((activity, index) => (
              <Card key={index} className="card-dark border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-lg bg-[var(--color-sdc-purple-mid)]/20 flex items-center justify-center">
                        <activity.icon className="h-5 w-5 text-[var(--color-sdc-purple-mid)]" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-2">{activity.title}</h4>
                      <p className="text-gray-400 text-sm mb-2">{activity.description}</p>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-[var(--color-sdc-blue-bright)]" />
                        <span className="text-xs text-[var(--color-sdc-blue-bright)]">{activity.frequency}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Leadership Section */}
        <Card className="card-dark border-gray-800 mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-2xl mb-4">
              Meet Our <span className="sdc-text-gradient">Leadership</span>
            </CardTitle>
            <CardDescription className="text-gray-400">
              Dedicated individuals driving our mission forward
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[var(--color-sdc-purple-mid)] to-[var(--color-sdc-blue-bright)] flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Heerath Bhat</h4>
              <p className="text-[var(--color-sdc-purple-mid)] font-medium mb-4">President</p>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Leading SDC with passion for technology and community building. Heerath brings years of experience 
                in software development and a vision for creating an inclusive learning environment for all members.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Mission Section */}
        <Card className="card-dark border-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-2xl mb-4 flex items-center justify-center">
              <Heart className="h-6 w-6 mr-2 text-red-400" />
              Our <span className="sdc-text-gradient ml-2">Mission</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                To foster a vibrant community of developers, innovators, and technology enthusiasts who collaborate, 
                learn, and grow together. We believe in the power of code to change the world and are committed to 
                providing the resources, mentorship, and opportunities needed for our members to succeed.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <Code className="h-8 w-8 text-[var(--color-sdc-purple-mid)] mx-auto mb-3" />
                  <h5 className="font-semibold text-white mb-2">Excellence</h5>
                  <p className="text-sm text-gray-400">Striving for the highest standards in everything we do</p>
                </div>
                <div className="text-center">
                  <Users className="h-8 w-8 text-[var(--color-sdc-purple-mid)] mx-auto mb-3" />
                  <h5 className="font-semibold text-white mb-2">Community</h5>
                  <p className="text-sm text-gray-400">Building lasting relationships and supporting each other</p>
                </div>
                <div className="text-center">
                  <Lightbulb className="h-8 w-8 text-[var(--color-sdc-purple-mid)] mx-auto mb-3" />
                  <h5 className="font-semibold text-white mb-2">Innovation</h5>
                  <p className="text-sm text-gray-400">Pushing boundaries and exploring new possibilities</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default About;

