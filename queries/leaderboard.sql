CREATE VIEW leaderboard AS
SELECT
username,
(DATE_PART('day', datecompleted::timestamp - datestarted::timestamp)) AS days,
(DATE_PART('hour', datecompleted::timestamp - datestarted::timestamp)) AS hours,
(DATE_PART('minute', datecompleted::timestamp - datestarted::timestamp)) AS minutes,
(DATE_PART('second', datecompleted::timestamp - datestarted::timestamp)) AS seconds
FROM accounts WHERE datecompleted IS NOT NULL ORDER BY days, hours, minutes, seconds DESC;