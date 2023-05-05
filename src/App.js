
import './App.css';
import MyForm from './myForm';
import MailForm from './mailForm';
import Newform from './Newform';
// import i18n from './i18n';
import { useTranslation  } from 'react-i18next';

function App() {
  // const [t, i18n] = useTranslation();
  // const changeLanguage = (lng) => {
  //   i18n.changeLanguage(lng);
  // }
  return (
    <div className="App">
        {/* <MyForm /> */}
        {/* <MailForm   /> */}
        <Newform   />
        {/* <button onClick={() => changeLanguage('es')}>de</button>
      <button onClick={() => changeLanguage('en')}>en</button>
        <h1>{t('Welcome to React')}</h1> */}
    </div>
  );
}

export default (App);
