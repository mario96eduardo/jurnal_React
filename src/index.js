//TODO Es uns integracion antigual de React

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { JournalApp } from './JournalApp';
// // import './styles/styles.scss';

// ReactDOM.render(
//   <JournalApp />,
//   document.getElementById('root')
// );
import React from 'react';
import { createRoot } from 'react-dom/client';
import { JournalApp } from './JournalApp';
import './styles/styles.scss';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<JournalApp />);
