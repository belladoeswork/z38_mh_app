// import React, { useState } from 'react';
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { 
//   LayoutDashboard,
//   Users, 
//   Calendar, 
//   FileText,
//   Play,
//   Pause,
//   RefreshCw,
//   Volume2,
//   Sun,
//   Gauge,
//   Clock,
//   ChevronLeft,
//   LogOut,
//   Settings
// } from 'lucide-react';

// const DashboardLayout = () => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [isPlaying, setIsPlaying] = useState(false);

//   return (
//     <div className="flex h-screen bg-[#f7f7f7]">
//       {/* Left Sidebar */}
//       <div className="w-52 bg-white border-r border-[#e5e5e5] flex flex-col">
//         <div className="p-4">
//           <h1 className="text-xl font-bold text-[#7ca498]">heilu</h1>
//         </div>

//         <nav className="flex-1">
//           <NavItem icon={<LayoutDashboard />} label="Dashboard" active />
//           <NavItem icon={<Users />} label="Patients" />
//           <NavItem icon={<Calendar />} label="Calendar" />
//           <NavItem icon={<FileText />} label="Documents" />
//         </nav>

//         <div className="border-t">
//           <NavItem icon={<Settings />} label="Settings" />
//           <NavItem icon={<LogOut />} label="Log Out" />
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Top Bar */}
//         <header className="h-16 bg-white border-b border-[#e5e5e5] flex items-center justify-between px-6">
//           <div className="flex items-center gap-4">
//             <Button variant="ghost" size="icon">
//               <ChevronLeft className="h-5 w-5" />
//             </Button>
//             <div>
//               <h2 className="font-medium">Current Session</h2>
//               <div className="text-sm text-gray-500">John Doe - Session 3 of 8</div>
//             </div>
//           </div>

//           <div className="flex items-center gap-8">
//             <div className="flex items-center gap-6">
//               <div className="flex items-center gap-2">
//                 <Clock className="h-4 w-4 text-gray-500" />
//                 <span className="text-sm font-medium">45:00 min</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Gauge className="h-4 w-4 text-gray-500" />
//                 <span className="text-sm font-medium">Level 2: Calm Garden</span>
//               </div>
//             </div>

//             <Button variant="destructive" size="sm">End Session</Button>

//             <div className="h-8 w-px bg-gray-200" />
            
//             <div className="flex items-center gap-3">
//               <div className="text-sm text-gray-600">Dr. Kelly</div>
//               <div className="w-8 h-8 rounded-full bg-[#7ca498] text-white flex items-center justify-center">
//                 DK
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Tab Navigation */}
//         <div className="bg-white border-b border-[#e5e5e5] px-6">
//           <nav className="flex gap-6">
//             {['Overview', 'Patient Details', 'Progress & Plan', 'Session History', 'Notes'].map((tab) => (
//               <button
//                 key={tab}
//                 className={`px-4 py-3 text-sm font-medium border-b-2 ${
//                   activeTab === tab.toLowerCase().replace(/ & /g, '-')
//                     ? 'border-[#7ca498] text-[#7ca498]'
//                     : 'border-transparent text-gray-500 hover:text-gray-700'
//                 }`}
//                 onClick={() => setActiveTab(tab.toLowerCase().replace(/ & /g, '-'))}
//               >
//                 {tab}
//               </button>
//             ))}
//           </nav>
//         </div>

//         {/* Main Content Area */}
//         <div className="flex-1 overflow-auto p-6">
//           <div className="grid grid-cols-12 gap-6">
//             {/* VR Scene Preview */}
//             <div className="col-span-8">
//               <Card className="p-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-lg font-semibold">VR Scene Preview</h3>
//                   <div className="flex items-center gap-2">
//                     <select className="px-3 py-1.5 border rounded-md text-sm">
//                       <option>Level 1: Peaceful Beach</option>
//                       <option>Level 2: Calm Garden</option>
//                       <option>Level 3: Mountain View</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="aspect-video bg-gray-100 rounded-lg mb-4">
//                   <div className="w-full h-full flex items-center justify-center text-gray-400">
//                     Scene Preview
//                   </div>
//                 </div>

//                 <div className="flex flex-col gap-4">
//                   {/* Scene Controls */}
//                   <div className="flex justify-center items-center gap-4">
//                     <Button 
//                       size="sm" 
//                       className={isPlaying ? "bg-gray-200" : "bg-[#7ca498] hover:bg-[#6b8f83]"}
//                       onClick={() => setIsPlaying(!isPlaying)}
//                     >
//                       {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
//                     </Button>
//                     <Button variant="outline" size="sm">
//                       <RefreshCw className="h-4 w-4" />
//                     </Button>
//                   </div>

//                   {/* Scene Settings */}
//                   <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
//                     <div className="flex flex-col gap-2">
//                       <label className="text-sm text-gray-600 flex items-center gap-2">
//                         <Volume2 className="h-4 w-4" />
//                         Sound
//                       </label>
//                       <input type="range" className="w-full" />
//                     </div>
//                     <div className="flex flex-col gap-2">
//                       <label className="text-sm text-gray-600 flex items-center gap-2">
//                         <Sun className="h-4 w-4" />
//                         Brightness
//                       </label>
//                       <input type="range" className="w-full" />
//                     </div>
//                     <div className="flex flex-col gap-2">
//                       <label className="text-sm text-gray-600 flex items-center gap-2">
//                         <Gauge className="h-4 w-4" />
//                         Intensity
//                       </label>
//                       <input type="range" className="w-full" />
//                     </div>
//                   </div>
//                 </div>
//               </Card>

//               {/* Biofeedback Component */}
//               <Card className="p-6 mt-6">
//                 <h3 className="text-lg font-semibold mb-4">Biofeedback Data</h3>
//                 <div className="h-96 flex items-center justify-center text-gray-400">
//                   Biofeedback Component Will Be Integrated Here
//                 </div>
//               </Card>
//             </div>

//             {/* AI Insights */}
//             <div className="col-span-4">
//               <Card className="p-6">
//                 <h3 className="text-lg font-semibold mb-4">AI Insights</h3>
//                 <div className="space-y-4">
//                   <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
//                     <div className="flex justify-between items-start mb-2">
//                       <span className="font-medium text-blue-800">Habituation Detected</span>
//                       <span className="text-xs text-blue-600">2:15 PM</span>
//                     </div>
//                     <p className="text-sm text-blue-700">
//                       Patient shows habituation to current intensity. Recommending gradual increase to maintain therapeutic effect.
//                     </p>
//                   </div>
//                   <div className="p-4 bg-green-50 rounded-lg border border-green-100">
//                     <div className="flex justify-between items-start mb-2">
//                       <span className="font-medium text-green-800">Progress Update</span>
//                       <span className="text-xs text-green-600">2:30 PM</span>
//                     </div>
//                     <p className="text-sm text-green-700">
//                       Positive response to current session. Breathing patterns indicate improved relaxation state compared to previous session.
//                     </p>
//                   </div>
//                 </div>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const NavItem = ({ icon, label, active }) => (
//   <button
//     className={`w-full flex items-center gap-3 px-4 py-2 text-sm ${
//       active 
//         ? 'text-[#7ca498] bg-[#7ca498]/10 font-medium' 
//         : 'text-gray-600 hover:bg-gray-50'
//     }`}
//   >
//     {icon}
//     {label}
//   </button>
// );

// export default DashboardLayout;