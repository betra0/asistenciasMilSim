import pool from "../db/pool.js";

export async function getBootstrap() {
    const client = await pool.connect();
    try {
        const [members, ranks, events] = await Promise.all([
            client.query("SELECT id, nickname, rank_id, join_date FROM members"),
            client.query("SELECT id, rank_name FROM ranks"),
            client.query("SELECT id, name, event_date FROM events")
        ]);
        
        const ranksFormat = []
        for (const rank of ranks.rows) {
            ranksFormat.push(rank.rank_name);
        }
        for (const member of members.rows){
            member.rank_name = ranks.rows.find(rank => rank.id === member.rank_id)?.rank_name || "Unknown";

        }
        const membersForRank = {}
        for (const member of members.rows) {
            if (!membersForRank[member.rank_name]) {
                membersForRank[member.rank_name] = [];
            }
            membersForRank[member.rank_name].push(member);
        }

        return {
            ranks: ranksFormat,
            membersForRank: membersForRank,
            events: events.rows,
            members: members.rows
        };
    } finally {
        client.release();
    }
}
