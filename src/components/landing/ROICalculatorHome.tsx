import { motion } from "framer-motion"
import { useState } from "react"
import { TrendingUp, Target, Briefcase, Palette, Home, BarChart3 } from "lucide-react"

const serviceTypes = [
  {
    id: "apartment",
    name: "Квартира",
    icon: <Home className="w-6 h-6" />,
    pricePerSqm: 80,
    description: "Стандартная уборка",
  },
  {
    id: "house",
    name: "Дом/коттедж",
    icon: <Briefcase className="w-6 h-6" />,
    pricePerSqm: 70,
    description: "Полная уборка",
  },
  {
    id: "office",
    name: "Офис",
    icon: <Target className="w-6 h-6" />,
    pricePerSqm: 60,
    description: "Коммерческая уборка",
  },
  {
    id: "general",
    name: "Генеральная",
    icon: <Palette className="w-6 h-6" />,
    pricePerSqm: 150,
    description: "Глубокая уборка",
  },
]

// Функция форматирования чисел с пробелами (русская локаль)
const formatRub = (num: number) => {
  return num.toLocaleString('ru-RU')
}

export default function ROICalculatorHome() {
  // Площадь в квадратных метрах (30 - 300)
  const [selectedArea, setSelectedArea] = useState(70)
  const [selectedService, setSelectedService] = useState("apartment")

  const selectedServiceType = serviceTypes.find((s) => s.id === selectedService)
  const pricePerSqm = selectedServiceType?.pricePerSqm || 80

  const calculatePrice = (area: number) => {
    return Math.round(area * pricePerSqm)
  }

  const calculateMonthlyPrice = (area: number) => {
    // Регулярная уборка 4 раза в месяц
    return Math.round(calculatePrice(area) * 4)
  }

  return (
    <section className="py-24 bg-black relative backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">Рассчитайте стоимость</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Узнайте стоимость уборки вашего помещения за несколько секунд
          </p>
        </motion.div>

        <div className="bg-gray-900/40 border border-gray-700/30 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden">
          {/* Subtle animated background */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 80%, rgba(147,51,234,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 80%, rgba(34,197,94,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 20%, rgba(249,115,22,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.1) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 15, repeat: Infinity }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Controls */}
            <div className="space-y-8">
              {/* Business Type Selection */}
              <div>
                <label className="block text-lg font-medium text-white mb-4">Выберите тип уборки</label>
                <div className="grid grid-cols-2 gap-3">
                  {serviceTypes.map((service) => (
                    <motion.button
                      key={service.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedService(service.id)}
                      className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                        selectedService === service.id
                          ? "bg-blue-500/20 border-blue-500/50 text-white"
                          : "bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-gray-600/50"
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div
                          className={`p-2 rounded-lg ${
                            selectedService === service.id ? "bg-blue-500/30" : "bg-gray-700/50"
                          }`}
                        >
                          {service.icon}
                        </div>
                        <div>
                          <div className="font-medium">{service.name}</div>
                          <div className="text-xs opacity-70">{service.description}</div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Budget Slider */}
              <div>
                <label className="block text-lg font-medium text-white mb-4">Площадь помещения</label>
                <div className="relative">
                  <input
                    type="range"
                    min="30"
                    max="300"
                    step="10"
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(Number(e.target.value))}
                    className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((selectedArea - 30) / (300 - 30)) * 100}%, #374151 ${((selectedArea - 30) / (300 - 30)) * 100}%, #374151 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-2">
                    <span>30 м²</span>
                    <span>300 м²</span>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <span className="text-3xl font-bold text-white">{selectedArea} м²</span>
                  <span className="text-gray-400 ml-2">площадь</span>
                </div>
              </div>

              {/* Data Disclaimer */}
              <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-medium text-white">Фиксированные цены</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Стоимость указана за разовую уборку. При регулярном обслуживании действуют скидки до 20%. Точная цена рассчитывается после осмотра.
                </p>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-8">
              {/* ROI Circle */}
              <div className="relative w-48 h-48 mx-auto">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    className="text-gray-700"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="35"
                    stroke="url(#gradient)"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "0 219.8" }}
                    animate={{
                      strokeDasharray: `${Math.min((selectedArea / 300) * 219.8, 219.8)} 219.8`,
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#06d6a0" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      key={`${selectedArea}-${selectedService}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-2xl font-bold text-white"
                    >
                      {pricePerSqm} &#8381;
                    </motion.div>
                    <div className="text-gray-400 text-sm">за м²</div>
                  </div>
                </div>
              </div>

              {/* Revenue Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 text-center">
                  <div className="w-8 h-8 text-green-400 mx-auto mb-2 flex items-center justify-center text-2xl font-bold">&#8381;</div>
                  <motion.div
                    key={`single-${selectedArea}-${selectedService}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-bold text-white mb-1"
                  >
                    {formatRub(calculatePrice(selectedArea))}
                  </motion.div>
                  <div className="text-gray-400 text-sm">Разовая уборка</div>
                </div>

                <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 text-center">
                  <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <motion.div
                    key={`monthly-${selectedArea}-${selectedService}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-bold text-white mb-1"
                  >
                    {formatRub(calculateMonthlyPrice(selectedArea))}
                  </motion.div>
                  <div className="text-gray-400 text-sm">4 раза/месяц</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}