export default function Dashboard(props: any) {
   return (
      <div>
         <h1>Dashboard Page</h1>
         <button
            onClick={() => {
               localStorage.clear();
               props.history.push('/login');
            }}
         >
            Logout
         </button>
      </div>
   );
}
