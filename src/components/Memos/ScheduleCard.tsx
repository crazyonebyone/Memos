import * as React from 'react'
import { dayDataType } from './Memos'
interface ShceduleCardType {
	cardData: dayDataType
	onClick: () => void
}
// 计算卡片时间比率
function calculationTime (start: any, end: any) {
	return (Number(end) * 100 - Number(start) * 100) / 100 * 2
}
function ScheduleCard({ cardData, ...otherProps }: ShceduleCardType) {
	const calcHeight = cardData.isHadInfo && calculationTime(cardData.startTime.timeNum, cardData.endTime.timeNum)
	const cardHeight = cardData.isHadInfo
		? calcHeight * 30 + calcHeight // 加上border的高度
		: 30
	return (
		<li
			{...otherProps}
		>
			{
				// 判断是否时新添加
				cardData.isHadInfo
				? <div
						style={{
							height: `${cardHeight}px`,
							backgroundColor: cardData.bgColor,
						}}
						className="remark-card"
					>
						<div className="time-intervals">
							{`${cardData.startTime.timeString}-${cardData.endTime.timeString}`}
						</div>
						<div className="remarks-content">
							<h3>{cardData.infoTitle}</h3>
						</div>
					</div>
				: <div></div>
			}
		</li>
	)
}
export default ScheduleCard