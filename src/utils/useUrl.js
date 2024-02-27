
export default function getHost() {
    const __isProd__ = process.env.NODE_ENV === 'production'
    const host = __isProd__ ? 'https://mygiftcardserver.onrender.com' : 'http://localhost:5000'
  return host
}


