
function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="app-footer relative w-full py-6 mt-8 border-t border-blue-300/30 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 dark:bg-gradient-to-r dark:from-blue-900/10 dark:to-indigo-900/10 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <p className="footer-title text-center font-medium text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2 dark:from-blue-400 dark:to-indigo-400">
            Task Tracker
          </p>
          <p className="footer-subtitle text-gray-600 dark:text-gray-400 text-sm mb-4">
            Built with React, Tailwind CSS & TypeScript
          </p>
          <div className="footer-social flex items-center justify-center space-x-4 mb-4">
            <a href="https://github.com/A-rahmanjs" target="_blank" rel="noopener noreferrer">
            <span className="social-icon w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 cursor-pointer transition-all duration-200 transform hover:scale-110 dark:bg-blue-700 dark:hover:bg-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
              </svg>
            </span>
            </a>
          </div>
          <p className="footer-copyright text-gray-500 dark:text-gray-400 text-sm">
            © {currentYear} Made by Abdo
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
