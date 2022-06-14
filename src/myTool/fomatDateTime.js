import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
export default function FomatDateTime({ datetime }) {
    let getDateTime = datetime.split(" ");
    let date = getDateTime[0];
    let time = getDateTime[1];
    time = time.substr(0, time.lastIndexOf(":"));
    return (
        <p style={{ display: 'flex', alignItems: 'center' }}>
            {time} <AccessAlarmIcon sx={{ fontSize: 15, marginRight: 1 }} />{formatDate(date)}
        </p>)
}

//
export function fomatDateTimeText(datetime) {
    let getDateTime = datetime.split(" ");
    let date = getDateTime[0];
    let time = getDateTime[1];
    time = time.substr(0, time.lastIndexOf(":"));
    return time + " " + date
}


//chỉ lấy ngày + tháng + năm
export function getOnlyDate(datetime) {
    let getDateTime = datetime.split(" ");
    let date = getDateTime[0];
    return formatDate(date);
}

export function getOnlyDateISO(datetime) {
    let getDateTime = datetime.split('T');
    let date = getDateTime[0];
    return formatDate(date);
}

// định dạng theo dd/MM/yyyy
function formatDate(date) {
    let getDateTime = date.split("-");
    let year = getDateTime[0];
    let month = getDateTime[1];
    let day = getDateTime[2];
    return day + "/" + month + "/" + year;
}