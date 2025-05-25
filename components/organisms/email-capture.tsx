// "use client"

// import { useState, type FC } from "react"
// import { motion } from "framer-motion"
// import { Sparkles, Instagram, MessageCircle, Linkedin, Youtube, CheckCircle, ArrowRight } from "lucide-react"
// import AnimatedButton from "@/components/atoms/animated-button"
// import { Input } from "@/components/ui/input"

// const InteractiveWaitlistBuilder: FC = () => {
//   const [step, setStep] = useState(1)
//   const [formData, setFormData] = useState({
//     email: "",
//     platforms: [],
//     contentType: "",
//     followerCount: ""
//   })

//   const platforms = [
//     { id: "instagram", name: "Instagram", icon: Instagram },
//     { id: "tiktok", name: "TikTok", icon: MessageCircle },
//     { id: "linkedin", name: "LinkedIn", icon: Linkedin },
//     { id: "youtube", name: "YouTube", icon: Youtube }
//   ]

//   const contentTypes = [
//     "Educational Content",
//     "Entertainment", 
//     "Product Marketing",
//     "Personal Brand",
//     "E-commerce",
//     "Agency/Client Work"
//   ]

//   const followerRanges = [
//     "Just Starting (0-1K)",
//     "Growing (1K-10K)", 
//     "Established (10K-100K)",
//     "Influencer (100K+)"
//   ]

//   const handlePlatformSelect = (platformId) => {
//     setFormData(prev => ({
//       ...prev,
//       platforms: prev.platforms.includes(platformId)
//         ? prev.platforms.filter(p => p !== platformId)
//         : [...prev.platforms, platformId]
//     }))
//   }

//   const getQueuePosition = () => {
//     return Math.floor(Math.random() * 500) + 100
//   }

//   const renderStep = () => {
//     switch (step) {
//       case 1:
//         return (
//           <div className="space-y-6">
//             <div className="text-center mb-8">
//               <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the BuzzDrop Revolution</h2>
//               <p className="text-xl text-gray-300">Let's personalize your experience</p>
//             </div>

//             <div className="space-y-4">
//               <label className="block text-sm font-medium text-gray-300">What's your email?</label>
//               <Input
//                 type="email"
//                 placeholder="your@email.com"
//                 value={formData.email}
//                 onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
//                 className="bg-background/50 backdrop-blur-sm border-gray-700 h-12"
//               />
//             </div>

//             <AnimatedButton 
//               onClick={() => setStep(2)}
//               disabled={!formData.email}
//               className="h-12 w-full"
//             >
//               <div className="flex items-center justify-center gap-2">
//                 <span>Continue</span>
//                 <ArrowRight className="h-4 w-4" />
//               </div>
//             </AnimatedButton>
//           </div>
//         )

//       case 2:
//         return (
//           <div className="space-y-6">
//             <div className="text-center mb-8">
//               <h3 className="text-2xl font-bold mb-2">Which platforms do you create for?</h3>
//               <p className="text-gray-300">Select all that apply</p>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               {platforms.map((platform) => {
//                 const Icon = platform.icon
//                 const isSelected = formData.platforms.includes(platform.id)
//                 return (
//                   <button
//                     key={platform.id}
//                     onClick={() => handlePlatformSelect(platform.id)}
//                     className={`p-4 rounded-lg border transition-all duration-200 ${
//                       isSelected 
//                         ? 'border-purple-500 bg-purple-500/20' 
//                         : 'border-gray-700 bg-background/50 hover:border-gray-600'
//                     }`}
//                   >
//                     <div className="flex flex-col items-center gap-2">
//                       <div className="p-3 rounded-full bg-purple-500">
//                         <Icon className="h-6 w-6 text-white" />
//                       </div>
//                       <span className="font-medium">{platform.name}</span>
//                       {isSelected && <CheckCircle className="h-4 w-4 text-purple-400" />}
//                     </div>
//                   </button>
//                 )
//               })}
//             </div>

//             <div className="flex gap-3">
//               <button 
//                 onClick={() => setStep(1)}
//                 className="h-12 px-6 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
//               >
//                 Back
//               </button>
//               <AnimatedButton 
//                 onClick={() => setStep(3)}
//                 disabled={formData.platforms.length === 0}
//                 className="h-12 flex-1"
//               >
//                 <div className="flex items-center justify-center gap-2">
//                   <span>Continue</span>
//                   <ArrowRight className="h-4 w-4" />
//                 </div>
//               </AnimatedButton>
//             </div>
//           </div>
//         )

//       case 3:
//         return (
//           <div className="space-y-6">
//             <div className="text-center mb-8">
//               <h3 className="text-2xl font-bold mb-2">What type of content do you create?</h3>
//               <p className="text-gray-300">Choose your primary focus</p>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               {contentTypes.map((type) => (
//                 <button
//                   key={type}
//                   onClick={() => setFormData(prev => ({ ...prev, contentType: type }))}
//                   className={`p-4 rounded-lg border transition-all duration-200 text-left ${
//                     formData.contentType === type
//                       ? 'border-purple-500 bg-purple-500/20' 
//                       : 'border-gray-700 bg-background/50 hover:border-gray-600'
//                   }`}
//                 >
//                   <span className="font-medium">{type}</span>
//                   {formData.contentType === type && (
//                     <CheckCircle className="h-4 w-4 text-purple-400 float-right mt-1" />
//                   )}
//                 </button>
//               ))}
//             </div>

//             <div className="flex gap-3">
//               <button 
//                 onClick={() => setStep(2)}
//                 className="h-12 px-6 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
//               >
//                 Back
//               </button>
//               <AnimatedButton 
//                 onClick={() => setStep(4)}
//                 disabled={!formData.contentType}
//                 className="h-12 flex-1"
//               >
//                 <div className="flex items-center justify-center gap-2">
//                   <span>Continue</span>
//                   <ArrowRight className="h-4 w-4" />
//                 </div>
//               </AnimatedButton>
//             </div>
//           </div>
//         )

//       case 4:
//         return (
//           <div className="space-y-6">
//             <div className="text-center mb-8">
//               <h3 className="text-2xl font-bold mb-2">What's your follower count?</h3>
//               <p className="text-gray-300">This helps us tailor your experience</p>
//             </div>

//             <div className="space-y-3">
//               {followerRanges.map((range) => (
//                 <button
//                   key={range}
//                   onClick={() => setFormData(prev => ({ ...prev, followerCount: range }))}
//                   className={`w-full p-4 rounded-lg border transition-all duration-200 text-left ${
//                     formData.followerCount === range
//                       ? 'border-purple-500 bg-purple-500/20' 
//                       : 'border-gray-700 bg-background/50 hover:border-gray-600'
//                   }`}
//                 >
//                   <span className="font-medium">{range}</span>
//                   {formData.followerCount === range && (
//                     <CheckCircle className="h-4 w-4 text-purple-400 float-right mt-1" />
//                   )}
//                 </button>
//               ))}
//             </div>

//             <div className="flex gap-3">
//               <button 
//                 onClick={() => setStep(3)}
//                 className="h-12 px-6 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
//               >
//                 Back
//               </button>
//               <AnimatedButton 
//                 onClick={() => setStep(5)}
//                 disabled={!formData.followerCount}
//                 className="h-12 flex-1"
//               >
//                 <div className="flex items-center justify-center gap-2">
//                   <Sparkles className="h-5 w-5" />
//                   <span>Join Waitlist</span>
//                 </div>
//               </AnimatedButton>
//             </div>
//           </div>
//         )

//       case 5:
//         return (
//           <div className="text-center space-y-6">
//             <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
//               <CheckCircle className="h-8 w-8 text-white" />
//             </div>
            
//             <div>
//               <h3 className="text-2xl font-bold mb-2">Welcome to BuzzDrop! 🎉</h3>
//               <p className="text-gray-300 mb-4">You're officially on the waitlist</p>
              
//               <div className="bg-purple-500/20 rounded-lg p-4 mb-6">
//                 <p className="text-sm text-gray-300 mb-2">Your position in queue:</p>
//                 <p className="text-3xl font-bold text-purple-400">#{getQueuePosition()}</p>
//               </div>

//               <div className="text-sm text-gray-400 space-y-2">
//                 <p>✨ Early access notifications sent to: <strong>{formData.email}</strong></p>
//                 <p>🎯 Optimized for: <strong>{formData.contentType}</strong></p>
//                 <p>📱 Platforms: <strong>{formData.platforms.join(", ")}</strong></p>
//               </div>
//             </div>

//             <div className="pt-4 border-t border-gray-800">
//               <p className="text-xs text-gray-500">
//                 By joining, you agree to our Terms of Service and Privacy Policy
//               </p>
//             </div>
//           </div>
//         )

//       default:
//         return null
//     }
//   }

//   return (
//     <section className="py-20">
//       <div className="container mx-auto px-4">
//         <div className="max-w-2xl mx-auto">
//           <div className="bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-blue-900/40 rounded-xl p-8 md:p-12 border border-gray-800">
//             {/* Progress Bar */}
//             {step < 5 && (
//               <div className="mb-8">
//                 <div className="flex justify-between text-sm text-gray-400 mb-2">
//                   <span>Step {step} of 4</span>
//                   <span>{Math.round((step / 4) * 100)}% Complete</span>
//                 </div>
//                 <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
//                   <div 
//                     className="h-full bg-purple-500 transition-all duration-300"
//                     style={{ width: `${(step / 4) * 100}%` }}
//                   />
//                 </div>
//               </div>
//             )}

//             {renderStep()}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default InteractiveWaitlistBuilder