import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area } from "recharts";
import PredictionCard from "./PredictionCard";
import { AlertTriangle, Brain, Target, Clock, BarChart3, Radar as RadarIcon } from "lucide-react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-lg px-3 py-2 text-xs font-mono">
        <p className="text-foreground font-semibold">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }}>{p.name}: {p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalysisDashboard({ result }) {
  if (!result) return null;

  const { summary, predictions, impact_scores, radar_data, timeline, difficult_questions, macro_analysis } = result;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-7xl mx-auto space-y-8"
    >
      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6 md:p-8 glow-primary"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <h2 className="font-space text-xl font-semibold">Intelligence Summary</h2>
        </div>
        <p className="text-muted-foreground font-space leading-relaxed">{summary}</p>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Impact Scores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-4 h-4 text-primary" />
            <h3 className="font-space font-semibold">Impact Assessment</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={impact_scores} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 28% 17% / 0.5)" />
              <XAxis dataKey="name" tick={{ fill: 'hsl(215 20% 55%)', fontSize: 11, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'hsl(215 20% 55%)', fontSize: 11, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="score" fill="hsl(199 89% 48%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Radar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <RadarIcon className="w-4 h-4 text-accent" />
            <h3 className="font-space font-semibold">Domain Analysis</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radar_data}>
              <PolarGrid stroke="hsl(215 28% 17% / 0.5)" />
              <PolarAngleAxis dataKey="domain" tick={{ fill: 'hsl(215 20% 55%)', fontSize: 10, fontFamily: 'JetBrains Mono' }} />
              <PolarRadiusAxis tick={false} axisLine={false} />
              <Radar name="Impact" dataKey="value" stroke="hsl(199 89% 48%)" fill="hsl(199 89% 48%)" fillOpacity={0.2} strokeWidth={2} />
              <Radar name="Risk" dataKey="risk" stroke="hsl(265 89% 60%)" fill="hsl(265 89% 60%)" fillOpacity={0.1} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-4 h-4 text-primary" />
          <h3 className="font-space font-semibold">Projected Timeline</h3>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={timeline}>
            <defs>
              <linearGradient id="colorImpact" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(199 89% 48%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(199 89% 48%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 28% 17% / 0.5)" />
            <XAxis dataKey="period" tick={{ fill: 'hsl(215 20% 55%)', fontSize: 11, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'hsl(215 20% 55%)', fontSize: 11, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="severity" stroke="hsl(199 89% 48%)" fill="url(#colorImpact)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Predictions Grid */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Target className="w-4 h-4 text-primary" />
          <h3 className="font-space text-xl font-semibold">Cascading Predictions</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {predictions?.map((pred, i) => (
            <PredictionCard key={i} prediction={pred} index={i} />
          ))}
        </div>
      </div>

      {/* Macro Analysis */}
      {macro_analysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
              <Brain className="w-5 h-5 text-accent" />
            </div>
            <h2 className="font-space text-xl font-semibold">Macro Intelligence Analysis</h2>
          </div>
          <p className="text-muted-foreground font-space leading-relaxed whitespace-pre-line">{macro_analysis}</p>
        </motion.div>
      )}

      {/* Difficult Questions */}
      {difficult_questions?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 md:p-8 glow-accent"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
              <AlertTriangle className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="font-space text-xl font-semibold">Critical Questions</h2>
              <p className="text-sm text-muted-foreground">Questions decision-makers must address</p>
            </div>
          </div>
          <div className="space-y-4">
            {difficult_questions.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 p-4 rounded-xl bg-background/30 border border-border/30"
              >
                <span className="font-mono text-accent font-bold text-lg shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-foreground font-space">{q}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
