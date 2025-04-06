import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";

export default function QuizShare() {
  const { roomCode } = useParams();
  const quizRoomUrl = `${window.location.origin}/quiz/room/${roomCode}`;

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">퀴즈 방 공유</h1>
      <p className="mb-2 text-gray-600">아래 QR 코드를 스캔하면 문제 풀이 방에 바로 입장할 수 있어요!</p>

      <div className="inline-block bg-white p-4 border border-gray-300 rounded">
        <QRCode value={quizRoomUrl} size={160} />
      </div>

      <p className="mt-4 text-sm text-gray-500">링크: {quizRoomUrl}</p>
    </div>
  );
}
