import itemStyle from './MenuItem.module.css'
import { NavLink } from 'react-router-dom';
// 메뉴아이템 컴포넌트 생성
// 부모로부터 메뉴프롭스를 받고있는데 그걸 주의해야함
function MenuItem({menu}){
    return(
        <NavLink to={`/menu/${menu.menuCode}`}> 
            <div className={itemStyle.MenuItem}>
                <h3>메뉴이름 : {menu.menuName}</h3>
                <h3>메뉴가격 : {menu.menuPrice}</h3>
                <h3>메뉴종류 : {menu.categoryName}</h3>
            </div>
        </NavLink>
    );
}

export default MenuItem;