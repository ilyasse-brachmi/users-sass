"use client";

import Link from 'next/link';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type Segment = {
  label: string;
  href: string;
};

export default function DynamicBreadcrumbs() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-6 bg-gray-100 rounded animate-pulse w-48"></div>
    );
  }

  const segments = pathname?.split('/').filter(Boolean);

  const breadcrumbs: Segment[] = [
    { label: 'Home', href: '/' },
    ...segments.map((seg, i) => ({
      label: decodeURIComponent(seg),
      href: '/' + segments.slice(0, i + 1).join('/'),
    })),
  ];

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      }
    >
      {breadcrumbs.map((crumb, idx) =>
        idx < breadcrumbs.length - 1 ? (
          <Link
            key={idx}
            href={crumb.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              color: '#555',
              textDecoration: 'none',
              fontSize: 12,
            }}
          >
            {idx === 0 ? (
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            ) : null}
            {crumb.label.charAt(0).toUpperCase() + crumb.label.slice(1)}
          </Link>
        ) : (
          <Typography
            key={idx}
            color="text.primary"
            sx={{
              display: 'flex', 
              alignItems: 'center', 
              color: 'var(--color-primary)',
              fontSize: 12,
              fontWeight: 600
            }}
          >
            {crumb.label.charAt(0).toUpperCase() + crumb.label.slice(1)}
          </Typography>
        )
      )}
    </Breadcrumbs>
  );
}