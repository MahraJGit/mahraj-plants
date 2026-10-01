import React from 'react'

const AboutCertification = () => {
  return (
    <section className='bg-cream/40 mb-28 text-center'>
        <div className="section-container">
            <h2 className='text-4xl text-primary'>Our ISO Certifications</h2>
            <p className='text-lg text-gray-500 max-w-4xl mx-auto mt-8'>We are committed to maintaining internationally recognized standards of quality, environmental responsibility, and occupational health and safety. Our ISO certifications reflect our dedication to excellence, continuous improvement, and responsible business practices.</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12'>
                <iframe src="/certifications/CERTIFICATE_ISO_9001.pdf" width="100%" height="600px" className='rounded-lg' ></iframe>
                <iframe src="/certifications/CERTIFICATE_ISO_14001.pdf" width="100%" height="600px" className='rounded-lg' ></iframe>
                <iframe src="/certifications/CERTIFICATE_ISO_45001.pdf" width="100%" height="600px" className='rounded-lg' ></iframe>
            </div>
        </div>
    </section>
  )
}

export default AboutCertification