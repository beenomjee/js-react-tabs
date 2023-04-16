import { useEffect, useRef, useState } from 'react'
import styles from './Tab.module.css'

const Tab1 = () => (
    <div className={styles.tabText}>Text from Tab 1</div>
)

const Tab2 = () => (
    <div className={styles.tabText}>Text from Tab 2</div>
)

const Tab3 = () => (
    <div className={styles.tabText}>Text from Tab 3</div>
)

const Tab4 = () => (
    <div className={styles.tabText}>Text from Tab 4</div>
)


const Tab = () => {
    const [activeTab, setActiveTab] = useState(0)
    const buttonContainerEl = useRef(null);

    const changeTab = (i, index, button) => {
        if (i === index) {
            button.classList.add(styles.active);
            // setWidth
            buttonContainerEl.current.style.setProperty('--w', `${button.offsetWidth}px`);
            // setPosition
            const containerRect = buttonContainerEl.current.getBoundingClientRect();
            const childRect = button.getBoundingClientRect();
            const childPosition = {
                x: childRect.left - containerRect.left + buttonContainerEl.current.scrollLeft,
                y: childRect.top - containerRect.top
            };
            console.log(childPosition);
            buttonContainerEl.current.style.setProperty('--l', `${childPosition.x}px`);
        } else {
            button.classList.remove(styles.active);
        }
    }

    const changeTabHandler = (index = 0) => {
        const buttons = buttonContainerEl.current.querySelectorAll('button')
        Array.from(buttons).forEach((button, i) => {
            changeTab(i, index, button);
        })
        setActiveTab(index)
    }

    useEffect(() => {
        changeTab(0, 0, buttonContainerEl.current.querySelector('button'));
    }, [buttonContainerEl])

    return (
        <div className={styles.container}>
            <div className={styles.top} ref={buttonContainerEl} style={{ '--w': '50px', '--l': '0px' }}>
                <button className={styles.active} onClick={() => changeTabHandler(0)}>ITEM ONE</button>
                <button onClick={() => changeTabHandler(1)}>ITEM TWO</button>
                <button onClick={() => changeTabHandler(2)}>ITEM THREE</button>
                <button onClick={() => changeTabHandler(3)}>ITEM FOUR</button>
            </div>
            <div className={styles.bottom}>
                {
                    (activeTab === 0)
                        ? <Tab1 />
                        : (activeTab === 1)
                            ? <Tab2 />
                            : (activeTab === 2)
                                ? <Tab3 />
                                : <Tab4 />
                }
            </div>
        </div>
    )
}

export default Tab