'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from '@/components/common/Logo'
import { Button } from '@/components/ui/button'

const STORAGE_KEY = 'lgs_age_verified'

export function AgeGate() {
  const [mounted, setMounted] = useState(false)
  const [verified, setVerified] = useState(true)
  const [denied, setDenied] = useState(false)

  useEffect(() => {
    setMounted(true)
    setVerified(localStorage.getItem(STORAGE_KEY) === 'true')
  }, [])

  useEffect(() => {
    if (mounted && !verified && !denied) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [mounted, verified, denied])

  const handleEnter = () => {
    localStorage.setItem(STORAGE_KEY, 'true')
    setVerified(true)
  }

  const handleDeny = () => {
    setDenied(true)
  }

  if (!mounted || verified) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-background flex items-center justify-center px-4"
      >
        {denied ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4 max-w-sm"
          >
            <p className="font-serif text-2xl text-foreground">Come back when you&apos;re ready.</p>
            <p className="text-sm text-muted-foreground">
              This site is intended for adults 21 years of age or older.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-center space-y-8 max-w-sm w-full"
          >
            {/* Logo */}
            <div className="flex justify-center">
              <Logo size="lg" linkDisabled />
            </div>

            {/* Copy */}
            <div className="space-y-3">
              <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                Age Verification Required
              </p>
              <h2 className="font-serif text-3xl text-foreground">
                Are you 21 or older?
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Legaseedz is an adults-only platform. You must be at least 21 years of age to enter.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Button
                onClick={handleEnter}
                variant="gold"
                size="lg"
                className="w-full"
              >
                Yes, I&apos;m 21 or older
              </Button>
              <Button
                onClick={handleDeny}
                variant="ghost"
                size="default"
                className="w-full text-muted-foreground text-xs"
              >
                No, I&apos;m under 21
              </Button>
            </div>

            <p className="text-[10px] text-muted-foreground/50">
              By entering you agree to our terms of use and confirm you are of legal age.
            </p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
