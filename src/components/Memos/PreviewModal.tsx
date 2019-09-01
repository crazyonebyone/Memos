import * as React from 'react'
import { dayDataType } from './Memos'
import { BG_MAP, SCHEDULE_HOUR_LIST } from './settings'
interface PreviewModalType {
	cardData: dayDataType
	isShow: boolean
	onSubmit: (week: string, id: number, data: any) => void
	onCancel: () => void
}
function PreviewModal({ cardData, isShow, onSubmit, onCancel }: PreviewModalType) {
	const selectHourList = []
	// 过滤当前时间，不能选择当前时间以上的时间
	SCHEDULE_HOUR_LIST.forEach(hour => {
		if (hour.timeNum > cardData.hour.timeNum) {
			selectHourList.push(hour)
		}
	})
	//处理提交，使用week,id来快速更新数据
	const handleSubmit = () => {
		if(cardData.infoTitle && cardData.infoContent && cardData.endTime) {
			cardData.isHadInfo = true
			cardData.bgColor = BG_MAP[Math.floor(Math.random() * BG_MAP.length)]
			return onSubmit(cardData.week, cardData.id, cardData)
		}
		alert('请填完')
	}
	// 每个数据更改时触发
	const changeCardDate = (type: string) => (e) => {
		if(type === 'endTime') {
			cardData.endTime.timeNum = e.target.value
			cardData.endTime.timeString = e.target[e.target.selectedIndex].innerText
			return
		}
		cardData[type] = e.target.value
	}
	return (
		<div className={`preview-modal-content ${isShow ? 'show-modal-animate' : ''}`}>
			<div
				className="modal-body"
				style={{backgroundColor: cardData.infoTitle && cardData.bgColor ? cardData.bgColor: '#fff'}}
			>
				<div
					className="close"
					onClick={onCancel}
					style={{color: cardData.isHadInfo ? '#fff' : '#999'}}
				>×</div>
				{
					cardData.isHadInfo
						? <div className="info-content">
							<p className="time-intervals">
								{`${cardData.startTime.timeString}-${cardData.endTime.timeString}`}
							</p>
							<h3>{cardData.infoTitle}</h3>
							<div>{cardData.infoContent}</div>
						</div>
						: <div className="add-content">
							<div className="input-body">
								<select onChange={changeCardDate('endTime')}>
									<option value="-1">请选择结束时间</option>
									{
										selectHourList.map(hour => (<option key={hour.timeString} value={hour.timeNum}>{hour.timeString}</option>))
									}
								</select>
								<input type="text" onChange={changeCardDate('infoTitle')} placeholder="请输入标题"/>
								<input type="text" onChange={changeCardDate('infoContent')} placeholder="请输入内容"/>
							</div>
							<input type="button" value="提交" onClick={handleSubmit} />
							<input type="button" value="取消" onClick={onCancel}/>
						</div>
				}
			</div>
		</div>
	)
}

export default PreviewModal