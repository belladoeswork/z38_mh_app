// import React, { useState } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceArea, Tooltip } from 'recharts';
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';

// const BiofeedbackDashboard = () => {
//   const [selectedMetric, setSelectedMetric] = useState('HRV');

//   const generateHistoricalData = (baseValue, variance, sessions = 8) => {
//     return Array.from({ length: sessions }, (_, i) => ({
//       date: `Session ${i + 1}`,
//       value: baseValue + Math.sin(i/2) * variance + Math.random() * (variance/2)
//     }));
//   };

//   const generateRealtimeData = (baseValue, variance) => {
//     return Array.from({ length: 30 }, (_, i) => ({
//       time: i,
//       value: baseValue + Math.sin(i/3) * variance + Math.random() * (variance/2)
//     }));
//   };

//   const metrics = {
//     HRV: { 
//       label: 'Heart Rate Variability',
//       value: 62.55,
//       unit: 'ms',
//       color: '#2563eb',
//       optimal: { min: 65, max: 75 },
//       warning: { min: 55, max: 85 },
//       status: 'warning',
//       realtimeData: generateRealtimeData(62.55, 5),
//       historicalData: generateHistoricalData(65, 8)
//     },
//     GSR: { 
//       label: 'Galvanic Skin Response',
//       value: 48.2,
//       unit: 'μS',
//       color: '#16a34a',
//       optimal: { min: 40, max: 50 },
//       warning: { min: 35, max: 55 },
//       status: 'optimal',
//       realtimeData: generateRealtimeData(48.2, 3),
//       historicalData: generateHistoricalData(45, 6)
//     },
//     Temperature: {
//       label: 'Temperature',
//       value: 36.8,
//       unit: '°C',
//       color: '#dc2626',
//       optimal: { min: 36.5, max: 37.2 },
//       warning: { min: 36, max: 37.5 },
//       status: 'optimal',
//       realtimeData: generateRealtimeData(36.8, 0.5),
//       historicalData: generateHistoricalData(36.8, 0.4)
//     },
//     EyeMovement: {
//       label: 'Eye Movement',
//       value: 12,
//       unit: 'mv',
//       color: '#9333ea',
//       optimal: { min: 10, max: 15 },
//       warning: { min: 8, max: 18 },
//       status: 'optimal',
//       realtimeData: generateRealtimeData(12, 2),
//       historicalData: generateHistoricalData(12, 3)
//     },
//     VoiceStress: {
//       label: 'Voice Stress',
//       value: 28,
//       unit: 'Hz',
//       color: '#ea580c',
//       optimal: { min: 20, max: 30 },
//       warning: { min: 15, max: 35 },
//       status: 'optimal',
//       realtimeData: generateRealtimeData(28, 4),
//       historicalData: generateHistoricalData(25, 5)
//     },
//     PulseRate: {
//       label: 'Pulse Rate',
//       value: 72,
//       unit: 'bpm',
//       color: '#0891b2',
//       optimal: { min: 60, max: 80 },
//       warning: { min: 50, max: 90 },
//       status: 'optimal',
//       realtimeData: generateRealtimeData(72, 8),
//       historicalData: generateHistoricalData(70, 10)
//     },
//     BreathingRate: {
//       label: 'Breathing Rate',
//       value: 14,
//       unit: 'br/m',
//       color: '#84cc16',
//       optimal: { min: 12, max: 16 },
//       warning: { min: 10, max: 18 },
//       status: 'optimal',
//       realtimeData: generateRealtimeData(14, 2),
//       historicalData: generateHistoricalData(14, 3)
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'optimal': return 'bg-green-50 border-green-200';
//       case 'warning': return 'bg-yellow-50 border-yellow-200';
//       case 'critical': return 'bg-red-50 border-red-200';
//       default: return 'bg-gray-50 border-gray-200';
//     }
//   };

//   const StatusIcon = ({ status }) => {
//     switch (status) {
//       case 'optimal': return <CheckCircle className="h-5 w-5 text-green-500" />;
//       case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
//       case 'critical': return <AlertCircle className="h-5 w-5 text-red-500" />;
//       default: return null;
//     }
//   };

//   return (
//     <Card className="w-full max-w-6xl">
//       <CardHeader className="border-b">
//         <div className="flex justify-between items-center">
//           <CardTitle>Patient Biofeedback</CardTitle>
//           <div className="text-sm text-gray-500">Session Duration: 00:45:30</div>
//         </div>
//       </CardHeader>
      
//       <CardContent className="p-6">
//         {/* Status Legend */}
//         <div className="flex gap-6 p-4 bg-gray-50 rounded-lg mb-6">
//           <div className="font-semibold">Status Zones:</div>
//           <div className="flex gap-6">
//             <div className="flex items-center gap-2">
//               <CheckCircle className="h-5 w-5 text-green-500" />
//               <span>Optimal Zone <span className="text-gray-500 text-sm">(Normal range)</span></span>
//             </div>
//             <div className="flex items-center gap-2">
//               <AlertTriangle className="h-5 w-5 text-yellow-500" />
//               <span>Warning Zone <span className="text-gray-500 text-sm">(Needs attention)</span></span>
//             </div>
//             <div className="flex items-center gap-2">
//               <AlertCircle className="h-5 w-5 text-red-500" />
//               <span>Critical Zone <span className="text-gray-500 text-sm">(Immediate action needed)</span></span>
//             </div>
//           </div>
//         </div>

//         {/* Metric Cards Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
//           {Object.entries(metrics).map(([key, metric]) => (
//             <div
//               key={key}
//               className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${getStatusColor(metric.status)}`}
//               onClick={() => setSelectedMetric(key)}
//             >
//               <div className="flex justify-between items-start mb-2">
//                 <div className="font-medium">{metric.label}</div>
//                 <StatusIcon status={metric.status} />
//               </div>
//               <div className="text-2xl font-bold">
//                 {metric.value}
//                 <span className="text-sm font-normal ml-1">{metric.unit}</span>
//               </div>
//               <div className="text-sm text-gray-600 mt-1">
//                 Optimal: {metric.optimal.min}-{metric.optimal.max} {metric.unit}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Detailed Analysis Section */}
//         <div className="bg-white rounded-lg border p-4">
//           <div className="flex justify-between items-center mb-4">
//             <div>
//               <h3 className="text-lg font-semibold">{metrics[selectedMetric].label} Analysis</h3>
//               <p className="text-sm text-gray-600">Detailed view and historical comparison</p>
//             </div>
//             <Select value={selectedMetric} onValueChange={setSelectedMetric}>
//               <SelectTrigger className="w-[200px]">
//                 <SelectValue placeholder="Select metric" />
//               </SelectTrigger>
//               <SelectContent>
//                 {Object.entries(metrics).map(([key, metric]) => (
//                   <SelectItem key={key} value={key}>
//                     {metric.label}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <Tabs defaultValue="realtime" className="mt-4">
//             <TabsList>
//               <TabsTrigger value="realtime">Current Session</TabsTrigger>
//               <TabsTrigger value="historical">Historical Data</TabsTrigger>
//             </TabsList>

//             <TabsContent value="realtime">
//               <div className="pt-4">
//                 <LineChart
//                   width={800}
//                   height={300}
//                   data={metrics[selectedMetric].realtimeData}
//                   margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="time" />
//                   <YAxis />
//                   <Tooltip />
                  
//                   <ReferenceArea
//                     y1={metrics[selectedMetric].optimal.min}
//                     y2={metrics[selectedMetric].optimal.max}
//                     fill="#4ade80"
//                     fillOpacity={0.1}
//                   />
//                   <ReferenceArea
//                     y1={metrics[selectedMetric].warning.min}
//                     y2={metrics[selectedMetric].optimal.min}
//                     fill="#facc15"
//                     fillOpacity={0.1}
//                   />
//                   <ReferenceArea
//                     y1={metrics[selectedMetric].optimal.max}
//                     y2={metrics[selectedMetric].warning.max}
//                     fill="#facc15"
//                     fillOpacity={0.1}
//                   />
                  
//                   <Line
//                     type="monotone"
//                     dataKey="value"
//                     stroke={metrics[selectedMetric].color}
//                     strokeWidth={2}
//                   />
//                 </LineChart>
//               </div>
//             </TabsContent>

//             <TabsContent value="historical">
//               <div className="pt-4">
//                 <LineChart
//                   width={800}
//                   height={300}
//                   data={metrics[selectedMetric].historicalData}
//                   margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="date" />
//                   <YAxis />
//                   <Tooltip />
                  
//                   <ReferenceArea
//                     y1={metrics[selectedMetric].optimal.min}
//                     y2={metrics[selectedMetric].optimal.max}
//                     fill="#4ade80"
//                     fillOpacity={0.1}
//                   />
                  
//                   <Line
//                     type="monotone"
//                     dataKey="value"
//                     stroke={metrics[selectedMetric].color}
//                     strokeWidth={2}
//                   />
//                 </LineChart>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default BiofeedbackDashboard;