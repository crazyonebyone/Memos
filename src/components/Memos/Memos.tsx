import * as React from "react"
import { useState } from 'react'
import ModalContainer from 'src/containers/ModalContainer'
import ScheduleCard from './ScheduleCard'
import PreviewModal from './PreviewModal'
import { SCHEDULE_WEEK_LIST, SCHEDULE_HOUR_LIST } from './settings'
import './style.less'
type initialStateType = {
    dayList: any
}
export interface dayDataType {
    id: number
    hour: any
    week: string
    isHadInfo: boolean
    bgColor?: string
    infoTitle?: string
    infoContent?: string
    startTime?: any
    endTime?: any
}
// 生成day时间格
function setDayList(data: initialStateType) {
    let id : number = 0
    const newHourList = JSON.parse(JSON.stringify(SCHEDULE_HOUR_LIST))
    newHourList.pop()
    SCHEDULE_WEEK_LIST.forEach((week: string) => {
        newHourList.forEach((hour: any) => {
            const newData = {
                id: id++,
                hour: hour,
                week,
                startTime: {
                    timeNum: hour.timeNum,
                    timeString: hour.timeString,
                },
                endTime: {
                    timeNum: hour.timeNum,
                    timeString: hour.timeString,
                },
                isHadInfo: false,
            }
            data.dayList[week] = data.dayList[week] ? [...data.dayList[week], newData] : [newData]
        })
    })
}
function Memos () {
    const initialState: initialStateType = {
        dayList: {},
    }
    setDayList(initialState)
    const [memosState, setMemosState] = useState(initialState)
    const [currentCardData, setCurrentCardData] = useState({} as dayDataType)
    const [isShowModal, setIsShowModal] = useState(false)
    // 每个时间格点击时，处理相应事务
    const handleRowClick = (dayData: dayDataType) => () => {
        setIsShowModal(true)
        setCurrentCardData(dayData)
    }
    // 关闭弹窗
    const closeModal = () => {
        setIsShowModal(false)
    }
	//处理新增提交，使用week,id来快速更新数据
    const handleAddCard = (week, id, cardData) => {
        const nowIndex = memosState.dayList[week].findIndex(x => x.id === id)
        memosState.dayList[week][nowIndex] = cardData
        const newData = JSON.stringify(memosState)
        setMemosState(JSON.parse(newData))
    }
    return <div className="schedule-container">
            <h1>Schedule Template</h1>
            <div className="schedule-content">
                <div className="schedule-hours">
                    <ul>
                        {
                            // 渲染时辰
                            SCHEDULE_HOUR_LIST.map((hour: any) => {
                                if(hour.isShow) {
                                    return <li key={hour.timeNum}>{hour.timeString}</li>
                                }
                                return null
                            })
                        }
                    </ul>
                </div>
                <div className="schedule-table">
                    <div className="schedule-header">
                        <ul>
                            {
                            // 渲染周
                            SCHEDULE_WEEK_LIST.map(week => (
                                <li key={week}>{week}</li>
                            ))
                            }
                        </ul>
                    </div>
                    <div className="schedule-body">
                        {
                            // 渲染每个时间格
                            SCHEDULE_WEEK_LIST.map(week => (
                                <ul key={week + memosState.dayList[week].id}>
                                    {
                                        memosState.dayList[week].map((day: dayDataType) => (
                                            <ScheduleCard
                                                key={day.id}
                                                cardData={day}
                                                onClick={handleRowClick(day)}
                                            />
                                        ))
                                    }
                                </ul>
                            ))
                        }
                    </div>
                </div>
            </div>
            {/* 注册弹窗 */}
            <ModalContainer>
                {
                    isShowModal &&
                        <PreviewModal
                            isShow={isShowModal}
                            cardData={currentCardData}
                            onSubmit={handleAddCard}
                            onCancel={closeModal}
                        />
                }
                
            </ModalContainer>
        </div>
}
export default Memos