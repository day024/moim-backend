// controllers/slotController.js
const { filterTimeSlots } = require("../services/meetingService"); // filterTimeSlots 함수는 service 파일에서 가져옵니다.

async function filterTimeSlotsController(req, res) {
  const { minDuration, minMembers } = req.body;

  // 유효성 검사
  if (typeof minDuration !== "number" || typeof minMembers !== "number") {
    return res
      .status(400)
      .json({ message: "잘못된 입력입니다. 숫자 값을 입력하세요." });
  }

  try {
    const filteredSlots = await filterTimeSlots(minDuration, minMembers);

    if (filteredSlots.length === 0) {
      return res
        .status(200)
        .json({ message: "조건에 맞는 시간대가 없습니다." });
    }

    return res.status(200).json(filteredSlots);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
}

module.exports = { filterTimeSlotsController };
