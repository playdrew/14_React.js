
function Header() {
    return (
        <div 
            style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '20px',
                backgroundColor: '#f2f2f2', 
                borderRadius: '15px', 
                padding: '10px', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
            }}
        >
            <img 
                src='/images/pokemonlogo.png' 
                alt="Pokemon Logo" 
                style={{ width: '15%', height: 'auto' }} 
            />
        </div>
    );
}

export default Header;