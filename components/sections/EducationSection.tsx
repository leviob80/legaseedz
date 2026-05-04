'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const articles = [
  {
    id: '1',
    category: 'Strain Education',
    title: 'What Makes a True Legacy Strain?',
    excerpt:
      "Not every strain with a famous name is the real thing. Here's how we verify genetic lineage and what separates a legacy cut from a recreation.",
    readTime: '4 min read',
  },
  {
    id: '2',
    category: "Grower's Guide",
    title: 'Long-Term Seed Storage: The Complete Guide',
    excerpt:
      'Temperature, humidity, light exposure — seed storage is science. Do it right and your genetics stay viable for decades. Do it wrong and you lose the whole batch.',
    readTime: '3 min read',
  },
  {
    id: '3',
    category: 'Brand Story',
    title: 'Why We Only Work with Local Legacy Growers',
    excerpt:
      "Big seed banks went global. We went the opposite direction. Here's why staying local matters to us and to the integrity of every pack we sell.",
    readTime: '5 min read',
  },
]

export function EducationSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
              From the Garden
            </p>
            <h2 className="font-serif text-4xl text-foreground">Grower&apos;s Notes</h2>
          </div>
          <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground/50">
            Journal launching soon
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-card border border-border rounded-lg p-6 flex flex-col gap-4 hover:border-primary/30 transition-colors duration-300"
            >
              {/* Category */}
              <p className="text-[10px] tracking-[0.2em] uppercase text-primary/70">
                {article.category}
              </p>

              {/* Title */}
              <h3 className="font-serif text-xl text-foreground leading-snug group-hover:text-primary/90 transition-colors">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {article.excerpt}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground/50">
                  {article.readTime}
                </span>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary/60 transition-colors" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
